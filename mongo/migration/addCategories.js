const { models } = require('./mongoose');

const addingCategories = async (categories, parentId) => {
  console.log('categories length : ', categories.length);
  for (let i = 0; i < categories.length; i++) {
    console.log('processing:', i);

    const category = categories[i];

    const childs = category.child;
    delete category.child;

    category.isActive = true;
    category.isdeleted = false;
    if (parentId) {
      category.parentId = parentId;
    }
    const newCategory = new models.CategoryModel(category);
    await newCategory.save();

    if (childs && childs.length) {
      addingCategories(childs, newCategory._id);
    }
  }
  console.log('All Categories added successfully.');
};

setTimeout(() => {
  const categories = [{
    name: 'Development',
    slug: 'development',
    description: '',
    sequence: 1,
    child: [{
      name: 'Web Development',
      slug: 'web_development',
      description: '',
      sequence: 1,
      child: [{
        name: 'Javascript',
        slug: 'javascript',
        description: '',
        sequence: 1,
      }, {
        name: 'React',
        slug: 'react',
        description: '',
        sequence: 2,
      }, {
        name: 'VueJS',
        slug: 'vuejs',
        description: '',
        sequence: 3,
      }, {
        name: 'Angular',
        slug: 'angular',
        description: '',
        sequence: 4,
      }, {
        name: 'NodeJS',
        slug: 'nodejs',
        description: '',
        sequence: 5,
      }, {
        name: 'Python',
        slug: 'python',
        description: '',
        sequence: 6,
      }, {
        name: 'PHP',
        slug: 'php',
        description: '',
        sequence: 7,
      }, {
        name: 'C#',
        slug: 'c#',
        description: '',
        sequence: 8,
      }, {
        name: 'C',
        slug: 'c',
        description: '',
        sequence: 10,
      }, {
        name: 'C++',
        slug: 'c++',
        description: '',
        sequence: 11,
      }, {
        name: 'CSS',
        slug: 'css',
        description: '',
        sequence: 12,
      }, {
        name: 'Java',
        slug: 'java',
        description: '',
        sequence: 9,
      }],
    }, {
      name: 'Mobile Development',
      slug: 'mobile_development',
      description: '',
      sequence: 2,
      child: [{
        name: 'Android Development',
        slug: 'android_development',
        description: '',
        sequence: 1,
      }, {
        name: 'iOS Development',
        slug: 'iOS_development',
        description: '',
        sequence: 2,
      }, {
        name: 'Swift',
        slug: 'swift',
        description: '',
        sequence: 3,
      }, {
        name: 'React Native',
        slug: 'react_native',
        description: '',
        sequence: 4,
      }, {
        name: 'Google Flutter',
        slug: 'google_flutter',
        description: '',
        sequence: 5,
      }, {
        name: 'Kotlin',
        slug: 'kotlin',
        description: '',
        sequence: 6,
      }, {
        name: 'Redux Framework',
        slug: 'redux_framework',
        description: '',
        sequence: 7,
      }],
    },
    {
      name: 'Database Design & Development',
      slug: 'database_design_development',
      description: '',
      sequence: 3,
      child: [{
        name: 'SQL',
        slug: 'sql',
        description: '',
        sequence: 1,
      }, {
        name: 'MySQL',
        slug: 'mysql',
        description: '',
        sequence: 2,
      }, {
        name: 'MongoDB',
        slug: 'mongodb',
        description: '',
        sequence: 3,
      }, {
        name: 'Oracle SQL',
        slug: 'oracle_sql',
        description: '',
        sequence: 4,
      }, {
        name: 'Oracle Certification',
        slug: 'oracle_certification',
        description: '',
        sequence: 5,
      }, {
        name: 'SQL Server',
        slug: 'sql_server',
        description: '',
        sequence: 6,
      }, {
        name: 'Postgre SQL',
        slug: 'postgre_sql',
        description: '',
        sequence: 7,
      }, {
        name: 'Database Management',
        slug: 'database_management',
        description: '',
        sequence: 8,
      }],
    },
    {
      name: 'Software Testing',
      slug: 'software_testing',
      description: '',
      sequence: 4,
      child: [{
        name: 'API Testing',
        slug: 'api_testing',
        description: '',
        sequence: 1,
      }, {
        name: 'Automation Testing',
        slug: 'automation_testing',
        description: '',
        sequence: 2,
      }],
    },
    {
      name: 'Development Tools',
      slug: 'development_tools',
      description: '',
      sequence: 5,
      child: [{
        name: 'Docker',
        slug: 'docker',
        description: '',
        sequence: 1,
      }, {
        name: 'Kubernates',
        slug: 'kubernates',
        description: '',
        sequence: 2,
      }, {
        name: 'Git',
        slug: 'git',
        description: '',
        sequence: 3,
      }, {
        name: 'DevOps',
        slug: 'devops',
        description: '',
        sequence: 4,
      }, {
        name: 'Jenkins',
        slug: 'jenkins',
        description: '',
        sequence: 5,
      }, {
        name: 'Jira',
        slug: 'jira',
        description: '',
        sequence: 6,
      }],
    }],
  }];

  addingCategories(categories, '');
}, 2000);
