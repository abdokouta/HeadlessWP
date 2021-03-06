import normalizeWordpress from './normalizeWordpress'
import makeRequest from '../makeRequest'

export default function getWPPostType(config, lang, options) {
  return makeRequest(
    config,
    `/wp/v2/${options.postType}?per_page=${config.perPage}${
      lang ? `&lang=${lang}` : ''
    }`,
    {
      ...options,
      transforms: [normalizeWordpress, ...(options.transforms || [])]
    }
  )
}
