/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://second-advent-ministries.co.ke',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin*', '/api*', '/dashboard*'],
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }
    ],
    // Don't add additionalSitemaps - it was causing loop
  }
}