import { DataSource } from 'typeorm';
import { Tag } from '../../modules/blogs/entities/tag.entity';

const DEFAULT_TAGS = [
  'Breast Cancer',
  'Cancer Awareness',
  'Cancer Treatment',
  'Chemotherapy',
];

export async function seedBlogTags(dataSource: DataSource) {
  const repo = dataSource.getRepository(Tag);

  for (const tag of DEFAULT_TAGS) {
    await repo.upsert(
      { tag },
      { conflictPaths: ['tag'] }, // unique column
    );
  }

  console.log('✅ Blog tags seeded');
}