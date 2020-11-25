module.exports = {
  siteMetadata: {
    title: 'AM WebDev',
    siteUrl: 'https://www.amwebdev.com',
    description: 'A place for all things %TOPICS%',
    topics: [
      'GraphQL',
      'Node',
      'Apollo',
      'Typescript',
      'React',
      'Startups',
      'DevOps',
    ],
    menu: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Blog',
        path: '/archive',
      },
      {
        name: 'Contact',
        path: '/contact',
      },
    ],
    footerMenu: [
      {
        name: 'Contact',
        path: '/contact',
      },
    ],
    search: true,
    author: {
      name: 'Andrew Mitchell',
      description: `
        I'm <strong>Andrew Mitchell</strong>, a Software Engineer - GraphQL Enthusiast - Typescript Evangelist - Coding Addict.
        This site acts a my portfolio for side projects as well a place I make blog posts to
        reaffirm my own knowledge and engage with the greater community of Software Engineers`,
      social: {
        facebook: '',
        twitter: 'https://twitter.com/andrewmitch12',
        linkedin: 'https://www.linkedin.com/in/andrewgeorgemitchell/',
        instagram: '',
        youtube: '',
        github: 'https://github.com/andrewgeorgemitchell/',
        twitch: '',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'imageAssets',
        path: `${__dirname}/content/assets/images`,
      },
    },
    {
      resolve: '@nehalist/gatsby-theme-nehalem',
      options: {
        manifest: {
          name: 'AM Web Development',
          short_name: 'AM WebDev',
          start_url: '/',
          background_color: '#a4cbb8',
          theme_color: '#a4cbb8',
          display: 'minimal-ui',
          icon: `${__dirname}/content/assets/images/SquareLogo.png`,
        },
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-57621410-8',
      },
    },
    {
      resolve: 'gatsby-plugin-google-adsense',
      options: {
        publisherId: 'ca-pub-1115526151933070',
      },
    },
  ],
};
