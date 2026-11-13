export default {
  name: 'siteSettings',
  title: 'Hospital & Clinic Information (ഹോസ്പിറ്റൽ വിവരങ്ങൾ)',
  type: 'document',
  fields: [
    {
      name: 'doctorName',
      title: 'Doctor Name',
      type: 'string',
      initialValue: 'Dr. Jem Kalathil',
    },
    {
      name: 'credentials',
      title: 'Doctor Credentials',
      type: 'string',
      initialValue: 'MBBS, MS (General Surgery), FRCS (Edinburgh)',
    },
    {
      name: 'role',
      title: 'Official Role',
      type: 'string',
      initialValue: 'Senior Consultant & Head of Department of Surgical Oncology',
    },
    {
      name: 'hospital',
      title: 'Hospital Name',
      type: 'string',
      initialValue: 'Aster Medcity, Kochi',
    },
    {
      name: 'directPhone',
      title: 'Direct Desk Phone',
      type: 'string',
      initialValue: '+91 484 669 9999',
    },
    {
      name: 'whatsappPhone',
      title: 'WhatsApp Clinical Coordinator Phone',
      type: 'string',
      initialValue: '+91 949 771 2345',
    },
    {
      name: 'opdSchedule',
      title: 'OPD Schedule Hours',
      type: 'string',
      initialValue: 'Monday – Saturday, 09:00 AM – 04:00 PM IST',
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'surgical.oncology@asterhospital.com',
    },
  ],
};

