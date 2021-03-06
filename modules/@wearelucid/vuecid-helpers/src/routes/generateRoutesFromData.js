import getPathFromUrl from '../url/getPathFromUrl'
import verifyTrailingSlash from '../url/verifyTrailingSlash'

// Load JSON file
function loadLocalizedJson(path, lang) {
  return require(`${path}.${lang}.json`)
}

export default function generateRoutesFromData(
  options = {
    langs: [],
    postTypes: {},
    dataPath: '',
    bundle: '',
    homeSlug: 'home'
  }
) {
  // Get an array of post types, something like [ 'pages', 'posts' ]
  const _postTypes = options.postTypes.map(pt => pt.type)

  // Load and save localized option JSON's, includes all pages and posts of our languages, something we can work with :)
  const localizedJson = options.langs.map(l =>
    loadLocalizedJson(`${options.dataPath}/${options.bundle}`, l.slug)
  )

  // Get path from url for each post type from locaized JSON and make an array :-)
  const langRoutes = _postTypes.reduce((acc, type) => {
    return [
      // All the pages
      ...acc.map(l => {
        // Kick out all the pages containing the home slug
        // This could also delete a page that contains a string linke '…/home…'
        // maybe a page with the permalink /pages/something/home-sweet-home
        // Sadly this step is necessary since we can not redirect() with our middleware during generate
        let f = l.filter(s => !s.includes(`/${options.homeSlug}`))
        return f.map(p => verifyTrailingSlash(p)) // Verify trailing slash so we don't get duplicate route generation
      }),
      // All the posts
      ...localizedJson.map(l => {
        return l[type].map(p => verifyTrailingSlash(getPathFromUrl(p.link))) // Verify trailing slash so we don't get duplicate route generation
      })
    ]
  }, []) // acc

  // Use root '/' for default lang
  const langRoutesRoot = options.langs.map(
    l => (l.default ? '/' : `/${l.slug}/`)
  )

  return [
    ...langRoutesRoot,
    ...langRoutes.reduce((acc, cur) => [...acc, ...cur]) // flatten array
  ]
}
