import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import FastifyTypebox from "../types/fastify.js";
import { Type } from "@sinclair/typebox";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const UploadRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // Upload image endpoint (requires authentication)
  fastify.post(
    "/image",
    {
      preHandler: fastify.auth([fastify.verifyJwt]),
      schema: {
        consumes: ["multipart/form-data"],
        response: {
          200: Type.Object({
            url: Type.String(),
            filename: Type.String(),
          }),
        },
      },
    },
    async (request, reply) => {
      const data = await request.file();

      if (!data) {
        return reply.code(400).send({ error: "No file uploaded" });
      }

      // Validate file type
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedMimeTypes.includes(data.mimetype)) {
        return reply.code(400).send({
          error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed",
        });
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      // Generate unique filename
      const fileExtension = path.extname(data.filename || "image.jpg");
      const filename = `${randomUUID()}${fileExtension}`;
      const filePath = path.join(uploadsDir, filename);

      // Save file
      const buffer = await data.toBuffer();
      await fs.writeFile(filePath, buffer);

      // Return the file URL
      const fileUrl = `/uploads/${filename}`;

      reply.code(200).send({
        url: fileUrl,
        filename: filename,
      });
    }
  );

  // Serve uploaded files
  fastify.get("/:filename", async (request, reply) => {
    const { filename } = request.params as { filename: string };
    console.log(filename);
    const filePath = path.join(process.cwd(), "uploads", filename);

    console.log(filePath);
    try {
      await fs.access(filePath);
      return reply.sendFile(filename, path.join(process.cwd(), "uploads"));
    } catch (error) {
      console.log(error);
      return reply.code(404).send({ error: "File not found" });
    }
  });
};

export default UploadRoutes;
