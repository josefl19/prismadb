const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const woopa = await prisma.explorer.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
				username: 'ajolonauta',
				mission: 'Node'
      },
    });

    const woopa1 = await prisma.explorer.upsert({
      where: { name: 'Woopa1' },
      update: {},
      create: {
        name: 'Woopa1',
				username: 'ajolonauta1',
				mission: 'Node'
      },
    });

    const woopa2 = await prisma.explorer.upsert({
      where: { name: 'Woopa 2' },
      update: {},
      create: {
        name: 'Woopa 2',
				username: 'ajolonauta2',
				mission: 'Java'
      },
    });

    const woopa3 = await prisma.explorer.upsert({
      where: { name: 'Woopa 3' },
      update: {},
      create: {
        name: 'Woopa 3',
				username: 'ajolonauta3',
				mission: 'Node'
      },
    });

    const woopa4 = await prisma.explorer.upsert({
        where: { name: 'Woopa 4' },
        update: {},
        create: {
          name: 'Woopa 4',
          username: 'ajolonauta4',
          mission: 'Node'
        },
    });

    const mission1 = await prisma.mission.upsert({
        where: { name: 'Mision Node'},
        update: {},
        create: {
          name: 'Mision Node',
          lang: 'Spanish',
          missionCommander: 'Carlo Gilmar',
          enrollments: 6500
        }
    });

    const mission2 = await prisma.mission.upsert({
      where: { name: 'Mision Java'},
      update: {},
      create: {
        name: 'Mision Java',
        lang: 'Spanish',
        missionCommander: 'Fernanda Ochoa',
        enrollments: 8500
      }
  });

    console.log('Create 5 explorers');
    console.log('Create 2 missions');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();