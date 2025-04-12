This is a [Next.js](https://nextjs.org) project designed to manage Kubernetes namespace definitions. It's bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Application Overview**

This application can connect to two distinct Kubernetes clusters. Its main purpose is to facilitate the migration of Kubernetes namespace definitions into a Git repository, typically GitHub. 

**Key Features**

-   **Namespace Dumping:** The application allows you to dump the entire contents of a Kubernetes namespace into a GitHub project. This includes all resources and configurations within the namespace.
-   **Git Integration:** Seamlessly integrate with Git repositories to store and manage your namespace definitions.
-   **Configuration Menu:** A dedicated configuration menu will be provided, allowing you to manage the necessary secrets for connecting to both Kubernetes clusters and the Git repository. This ensures secure access and operation.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
