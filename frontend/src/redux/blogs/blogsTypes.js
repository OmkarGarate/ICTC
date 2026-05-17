/**
 * Blog State Shape
 *
 * @typedef {Object} Blog
 * @property {number}      id
 * @property {string}      slug
 * @property {string}      title
 * @property {string}      type
 * @property {string|null} date
 * @property {string|null} category
 * @property {string|null} author
 * @property {string|null} image        - cover image path e.g. /uploads/abc.jpg
 * @property {Object|null} content      - TipTap JSON
 * @property {string[]}    tags
 * @property {string|null} metaTitle
 * @property {string|null} metaDescription
 * @property {string|null} keywords
 * @property {boolean}     isDeleted
 * @property {string}      createdAt
 * @property {string}      updatedAt
 *
 * @typedef {Object} BlogsState
 * @property {Blog[]}      list
 * @property {Blog|null}   selected
 * @property {boolean}     loading
 * @property {string|null} error
 */

export const BLOGS_INITIAL_STATE = {
  list:     [],
  selected: null,
  loading:  false,
  error:    null,
};