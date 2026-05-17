/**
 * Doctor State Shape
 *
 * @typedef {Object} Doctor
 * @property {number}   id
 * @property {string}   slug
 * @property {string}   name
 * @property {string}   designation
 * @property {string}   qualification
 * @property {string}   phone
 * @property {number}   rating
 * @property {number}   reviews
 * @property {string}   summary
 * @property {string}   philosophy
 * @property {string|null} image
 * @property {number[]} centreIds
 * @property {string[]} stories
 * @property {string[]} languages
 * @property {string[]} expertise
 * @property {string[]} achievements
 * @property {{ title: string, place: string }[]} education
 * @property {{ role: string, place: string }[]}  experience
 * @property {boolean}  isDeleted
 * @property {string}   createdAt
 * @property {string}   updatedAt
 *
 * @typedef {Object} DoctorsState
 * @property {Doctor[]}      list         - all doctors
 * @property {Doctor|null}   selected     - single doctor (detail view)
 * @property {boolean}       loading
 * @property {string|null}   error
 */

export const DOCTORS_INITIAL_STATE = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};