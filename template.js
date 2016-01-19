/*
  A template for asynchronous action creator lifcycle.
  Use the `generate-actions.sh` script to create an instance.

  cat template.js | ./generate-actions.sh > my-actions.js

 */

'use strict'

/* $Verb $noun *****************************************************/

/*

0. Paste below into where your actions live

1. Import action constants into the reducer and add to the switch statement

  import {
    $NOUN_$VERB_INTENT,
    $NOUN_$VERB_RECEIPT,
    $NOUN_$VERB_ERROR,
  } from '../actions'

2. Import $verb$Noun into the UI component

 */

export const $NOUN_$VERB_INTENT  = '$NOUN_$VERB_INTENT';
export const $NOUN_$VERB_RECEIPT = '$NOUN_$VERB_RECEIPT';
export const $NOUN_$VERB_ERROR   = '$NOUN_$VERB_ERROR';

/**
 * The top-level asynchronous action creator.
 * Dispatches intent, receipt, and error lifecycle events.
 * @param  {Object} data The input sent to the remote request
 * @return {function} The thunk
 */
export function $verb$Noun(data) {
	return function(dispatch, getState) {
		dispatch(intend$Verb$Noun());
		return do$Verb$Noun(data)
			.then(function(receipt) {
				console.log('$Verb $noun');
				dispatch(received$Verb$Noun(receipt));
			})
      // .then( Dispatch subsequent actions here. )
			.catch(function(error){
				console.error(error);
				dispatch(error$Verb$Noun(error));
			});
	}
}

/**
 * Perform the actual asynchronous work. There shouldn't be anything
 * action-specific in here, just business logic.
 * @param  {?} $noun
 * @return {Promise}
 */
function do$Verb$Noun($noun) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/$noun');
    xhr.onload = function() {
      if(this.status < 300) {
        resolve(JSON.parse(this.responseText));
      } else if (this.status >= 300) {
        let error = new Error(this.responseText);
        error.httpStatus = this.statusText;
        error.httpCode = this.status;
        reject(error);
      }
    };
    xhr.ontimeout =
		xhr.onabort =
		xhr.error = function(evt) {
      reject(new Error('Network Error'));
    };
    xhr.send($noun);
  });
}

/**
 * Synchronous action declaring the intent to $verb a $noun. Use this action
 * to indicate progress on completing the task as well, for example from a file
 * upload XHR request.
 * @param  {number} progress = 0.0 An optional progress indicator from 0 to 1.0
 * @return {Object} The intent action
 */
function intend$Verb$Noun($noun, progress = 0.0) {
  return {
    type: $NOUN_$VERB_INTENT,
		$noun: $noun,
    progress: progress
  }
}

/**
 * Synchronous action dispatched from the asynchronous `$verb$Noun` indicating
 * that the remote service has successfully returned data.
 * @param  {Object} receipt The data returned from the service
 * @return {Object} The receipt action
 */
function received$Verb$Noun(receipt) {
  return {
    type: $NOUN_$VERB_RECEIPT,
    receipt: receipt
  }
}

/**
 * Synchronous action dispatched from the asynchronous `$verb$Noun` indicating
 * that the remote service wasn’t able to complete because of an error.
 * @param  {Error} error An `Error` instance with custom properties
 *                        indicating specifics of the failure
 * @return {Object} The action
 */
function error$Verb$Noun(error) {
  return {
    type: $NOUN_$VERB_ERROR,
    error: error
  }
}
