/** Why JS config file than .env?
 * The motivation for this is that, this shared code actually does not run
 * independently on its own, but rather its code is imported in other
 * projects that have their own environments.
 */

export const GITHUB_REPOSITORY_BASEPI =
  "https://api.github.com/search/repositories"

export const BASE_API = "https://temp.jacklaurence.net"
