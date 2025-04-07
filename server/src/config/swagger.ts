import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.4",
    info: {
      title: "REST APIs Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API documentation for Products",
    },
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
