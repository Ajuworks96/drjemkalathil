export default {
  name: 'review',
  title: 'Patient Reviews (രോഗികളുടെ അഭിപ്രായങ്ങൾ)',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      title: 'Patient Name / Family Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g. K. S. Narayanan or Tariq Al-Hashmi',
    },
    {
      name: 'rating',
      title: 'Rating (1 to 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'surgeryType',
      title: 'Specialty / Treatment Received',
      type: 'string',
      options: {
        list: [
          { title: 'Oncoplastic Breast Surgery', value: 'Oncoplastic Breast Surgery' },
          { title: 'HIPEC & Cytoreductive Surgery', value: 'HIPEC & Cytoreductive Surgery' },
          { title: 'Robotic Cancer Surgery', value: 'Robotic Cancer Surgery' },
          { title: 'Retroperitoneal Sarcoma', value: 'Retroperitoneal Sarcoma' },
          { title: 'Surgical Second Opinion Consultation', value: 'Surgical Second Opinion Consultation' },
          { title: 'Other Clinical Care', value: 'Other Clinical Care' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'reviewText',
      title: 'Patient Testimonial / Review Words',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
      description: 'The authentic experience shared by the patient or family.',
    },
    {
      name: 'location',
      title: 'Patient Location / City',
      type: 'string',
      description: 'e.g. Ernakulam, Kochi or Dubai, UAE',
    },
    {
      name: 'date',
      title: 'Date / Month of Review',
      type: 'string',
      description: 'e.g. February 2026',
    },
    {
      name: 'isVerified',
      title: 'Show "Verified Patient" Badge',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'approved',
      title: 'Approved to Display on Live Website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn this ON to show the review on the website.',
    },
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'surgeryType',
      approved: 'approved',
    },
    prepare(selection: any) {
      const { title, subtitle, approved } = selection;
      return {
        title: `${title} (${approved ? '✓ Live' : 'Draft'})`,
        subtitle,
      };
    },
  },
};

