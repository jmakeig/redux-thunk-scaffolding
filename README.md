Generate scaffolding for asynchronous [Redux](https://github.com/rackt/redux/) actions, in the style of [redux-thunk](https://github.com/gaearon/redux-thunk) middleware.

## Usage

```
  Usage:
  
    ./thunk verb noun

  For example, “fetch” and “bone” will result in a fetchBone(bone) 
  action creator and a BONE_FETCH_RECEIPT constant, among others.
  Typically you’d pipe stdout to your clipboard and paste into 
  where your actions are stored.

    ./thunk fetch bone | pbcopy # OS X
    ./thunk fetch bone >> my-actions.js
```    
