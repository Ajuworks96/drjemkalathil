export default {
  name: 'pageSeo',
  title: 'Page SEO Settings (ഗൂഗിൾ റാങ്കിങ് സെറ്റിങ്സ്)',
  type: 'document',
  fields: [
    {
      name: 'pageSlug',
      title: 'Page Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Home Page (/)', value: 'home' },
          { title: 'Clinical Areas (/clinical-areas)', value: 'clinical-areas' },
          { title: 'Patient Journey (/patient-journey)', value: 'patient-journey' },
          { title: 'Upload Records (/upload-records)', value: 'upload-records' },
          { title: 'Contact Us (/contact)', value: 'contact' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaTitle',
      title: 'Google Meta Title (Max 60 chars)',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(70),
      description: 'The title shown in Google search results and browser tab.',
    },
    {
      name: 'metaDescription',
      title: 'Google Meta Description (140-160 chars)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(170),
      description: 'The summary snippet shown beneath the title in Google search.',
    },
    {
      name: 'keywords',
      title: 'Focus Keywords (Comma separated)',
      type: 'string',
      description: 'e.g. Oncoplastic Breast Surgery, HIPEC Kerala, Dr Jem Kalathil Kochi',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL (Optional)',
      type: 'url',
      description: 'Custom canonical URL if different from default.',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (OpenGraph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Image displayed when sharing the link on WhatsApp, LinkedIn, or Facebook (1200x630 recommended).',
    },
  ],
  preview: {
    select: {
      title: 'pageSlug',
      subtitle: 'metaTitle',
    },
  },
};
