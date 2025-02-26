import { Topic } from "@/app/types/Topic";

export const topics: Topic[] = [
  {
    id: 1,
    title: 'Next.js App Router',
    preview: '/images/nextjs-app-router.png',
    explanation: 'The Next.js App Router is a new routing system introduced in Next.js 13. It provides a more intuitive and powerful way to create routes and layouts in your Next.js applications.',
    codeSections: [
      {
        title: 'Home Page',
        location: 'app/page.tsx',
        code: `export default function Home() {
  return <h1>Welcome to Next.js App Router</h1>
}`,
        language: 'react'
      }
    ]
  },
  {
    id: 2,
    title: 'React Server Components',
    preview: '/images/react-server-components.png',
    explanation: 'React Server Components allow you to render React components on the server, reducing the amount of JavaScript sent to the client and improving performance.',
    codeSections: [
      {
        title: 'Server Component',
        location: 'app/ServerComponent.tsx',
        code: `export default async function ServerComponent() {
  const data = await fetchData()
  return <div>{data}</div>
}`,
        language: 'react'
      }
    ]
  },
  {
    id: 3,
    title: 'Tailwind CSS Configuration',
    preview: '/images/tailwind-config.png',
    explanation: 'Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. Configuring Tailwind CSS involves customizing the tailwind.config.js file.',
    codeSections: [
      {
        title: 'Tailwind Config',
        location: 'tailwind.config.js',
        code: `module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
        language: 'react'
      }
    ]
  },
  {
    id: 4,
    title: 'Prisma Schema',
    preview: '/images/prisma-schema.png',
    explanation: 'Prisma is an ORM (Object-Relational Mapping) for Node.js and TypeScript. The Prisma schema is where you define your data models and relationships.',
    codeSections: [
      {
        title: 'Prisma Schema',
        location: 'schema.prisma',
        code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}`,
        language: 'css'
      }
    ]
  }
]