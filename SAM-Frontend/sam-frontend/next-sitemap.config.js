/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://second-advent-ministries.co.ke',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: ['https://second-advent-ministries.co.ke/sitemap.xml']
  }
}