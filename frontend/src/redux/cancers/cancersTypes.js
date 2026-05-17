/**
 * Cancer State Shape
 *
 * @typedef {Object} CancerFaq
 * @property {number} id
 * @property {string} question
 * @property {string} answer
 *
 * @typedef {Object} Cancer
 * @property {number}      id
 * @property {string}      slug
 * @property {string}      name
 * @property {string|null} coverImage
 * @property {string|null} content     - rich HTML from TipTap editor
 * @property {CancerFaq[]} faqs
 * @property {boolean}     isDeleted
 * @property {string}      createdAt
 * @property {string}      updatedAt
 *
 * @typedef {Object} CancersState
 * @property {Cancer[]}    list
 * @property {Cancer|null} selected
 * @property {boolean}     loading
 * @property {string|null} error
 */

export const CANCERS_INITIAL_STATE = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};