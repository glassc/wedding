module.exports.page = function(page)
{
    return {id: page._id, content: page.content, title: page.title, slug: page.slug, links: { self: "/api/pages/" + page._id}, order:page.order };
};

module.exports.no_content = function(page)
{
    return {id: page._id, title: page.title, slug: page.slug, links: { self: "/api/pages/" + page._id}, order:page.order };
};