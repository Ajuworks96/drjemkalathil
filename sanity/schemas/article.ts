export default {
  name: 'article',
  title: 'Cancer Articles & Guides (ക്ലിനിക്കൽ ഗൈഡുകൾ)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Headline',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g. When is HIPEC Recommended for Peritoneal Cancer?',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Clinical Category',
      type: 'string',
      options: {
        list: [
          'Oncoplastic Breast Surgery',
          'HIPEC & Cytoreductive Surgery',
          'Robotic Cancer Surgery',
          'Surgical Second Opinion',
          'Patient Guide',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Short Summary / Excerpt (1-2 sentences)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readTimeMinutes',
      title: 'Estimated Read Time (Minutes)',
      type: 'number',
      initialValue: 4,
    },
    {
      name: 'content',
      title: 'Article Body Content',
      type: 'text',
      rows: 15,
      description: 'Full clinical advice or article content.',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title (Optional override)',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description (Optional override)',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
};

