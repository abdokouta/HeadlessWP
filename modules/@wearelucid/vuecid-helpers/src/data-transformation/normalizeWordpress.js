import applyToOneOrMany from './applyToOneOrMany'

/**
 * Normalize WordPress post object(s).
 */

export default function normalizeWordpress(data) {
  return applyToOneOrMany(_normalizeWordpressPost, data)
}

function _normalizeWordpressPost(post) {
  if (post === null || typeof post !== 'object') {
    return post
  } else {
    post.title = post.title.rendered
    post.content = post.content.rendered
    post.excerpt = post.excerpt ? post.excerpt.rendered : null
    return post
  }
}
