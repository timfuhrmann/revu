const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ["lh3.googleusercontent.com", "static-cdn.jtvnw.net"],
    },
});
