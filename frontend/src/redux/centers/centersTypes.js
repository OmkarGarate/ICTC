/**
 * Center State Shape
 *
 * @typedef {Object} Center
 * @property {number}      id
 * @property {string}      slug
 * @property {string}      name
 * @property {string|null} heroImage
 * @property {string|null} centerImage
 * @property {string[]}    gallery
 * @property {boolean}     isDeleted
 * @property {string}      createdAt
 * @property {string}      updatedAt
 *
 * @typedef {Object} CentersState
 * @property {Center[]}    list           - All centers (admin table)
 * @property {Center[]}    activeCenters  - Non-deleted centers only (doctor assignment)
 * @property {Center|null} selected
 * @property {boolean}     loading
 * @property {string|null} error
 */

export const CENTERS_INITIAL_STATE = {
  list: [],
  activeCenters: [],   // <-- new: used for doctor assignment dropdowns
  selected: null,
  loading: false,
  error: null,
};