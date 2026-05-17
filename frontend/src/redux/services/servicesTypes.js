/**
 * Service State Shape
 *
 * @typedef {Object} ServiceFaq
 * @property {number} id
 * @property {string} question
 * @property {string} answer
 *
 * @typedef {Object} Service
 * @property {number}       id
 * @property {string}       slug
 * @property {string}       name
 * @property {string|null}  coverImage
 * @property {string|null}  content       - rich HTML from TipTap editor
 * @property {ServiceFaq[]} faqs
 * @property {boolean}      isDeleted
 * @property {string}       createdAt
 * @property {string}       updatedAt
 *
 * @typedef {Object} ServicesState
 * @property {Service[]}    list
 * @property {Service|null} selected
 * @property {boolean}      loading
 * @property {string|null}  error
 */

export const SERVICES_INITIAL_STATE = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};