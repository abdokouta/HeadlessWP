// Get static JSON file (e.g. basic.de.json or posts.de.1.json)
export default async function getDataServer(fileProps) {
  // prettier-ignore
  return require(`~/static/data/${fileProps.name}${fileProps.lang ? `.${fileProps.lang}` : ''}${fileProps.page ? `.${fileProps.page}` : ''}.json`)
}
