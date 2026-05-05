import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@example.com',
      password,
    },
  });

  const tagNames = ['work', 'personal', 'ideas', 'to-do'];
  const tags = await Promise.all(
    tagNames.map((name) => prisma.tag.create({ data: { name } })),
  );

  await prisma.note.create({
    data: {
      title: 'Getting Started with React',
      content:
        '## Intro\nReact is a **JavaScript library** for building UIs.\n\n- Component-based\n- Virtual DOM\n- Unidirectional data flow',
      isPinned: true,
      userId: user.id,
      noteTags: { create: [{ tagId: tags[0].id }, { tagId: tags[2].id }] },
    },
  });

  await prisma.note.create({
    data: {
      title: 'TypeScript Tips',
      content:
        '## Useful Patterns\n\nAlways prefer `unknown` over `any`.\n\nUse `type` over `interface` for consistency.',
      isPinned: false,
      userId: user.id,
      noteTags: { create: [{ tagId: tags[0].id }] },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Weekend Plans',
      content:
        '## Saturday\n- Buy groceries\n- Clean apartment\n\n## Sunday\n- Hiking at the park',
      isPinned: true,
      userId: user.id,
      noteTags: { create: [{ tagId: tags[1].id }] },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Project Ideas',
      content:
        '## App Ideas\n\n1. Markdown note-taking app\n2. Budget tracker\n\n> Start small, ship fast.',
      isPinned: false,
      userId: user.id,
      noteTags: { create: [{ tagId: tags[2].id }, { tagId: tags[1].id }] },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Deleted Draft',
      content: '## Rough Draft\nThis note was moved to trash.',
      isPinned: false,
      isDeleted: true,
      userId: user.id,
      noteTags: { create: [{ tagId: tags[2].id }] },
    },
  });

  console.log('Seed complete. Demo user: demo@example.com / password123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
