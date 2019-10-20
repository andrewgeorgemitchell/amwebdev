module.exports = {
  siteMetadata: {
    title: 'AM Web Development',
    siteUrl: 'https://amwebdev.netlify.com',
    description: 'We create %TOPICS%',
    topics: [
      'Websites',
      'Apps',
      'Educational Blog Posts',
      '',
      '',
    ],
    menu: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Portfolio',
        path: '/portfolio',
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
        I'm <strong>Andrew Mitchell</strong>, an Entrepreneur turned Software Engineer.
        This site acts a my portfolio for side projects as well a place I make blog posts to
        reaffirm my own knowledge and give back to the community.`,
      social: {
        facebook: '',
        twitter: '',
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
  ],
};
