import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

const initialPosts = [
  {
    title: "Post 1",
    slug: "post-1",
    content: "Content of post 1",
    author: {
      connectOrCreate: {
        where: {
          email: "john@gmail.com",
        },
        create: {
          email: "john@gmail.com",
          hashedPassword: "asdgasdnsansad12g",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding...");
  for (const post of initialPosts) {
    const newPost = await prisma?.post?.create({
      data: post,
    });
    console.log(`Created post with id: ${newPost?.id}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
