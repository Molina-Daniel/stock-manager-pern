import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

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

export const swaggerUiOptions: SwaggerUiOptions = {
  customSiteTitle: "Stock Manager API",
  customCss: `.swagger-ui .topbar { background-color: #2b3b45 }`,
  customJs: `
    document.addEventListener("DOMContentLoaded", function() {
      const title = document.querySelector(".title") as HTMLElement;
      title.innerHTML = "Stock Manager API";
    });
  `,
};

export default swaggerSpec;
