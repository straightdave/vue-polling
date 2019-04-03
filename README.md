# vue-polling
Vue plugin for polling backend APIs

## Observers
Observers would fire HTTP Get calls periodically to the backend APIs.
After you call `Vue.use(VuePolling)`, you would have a `$polling` object in your Vue._prototype_. With `$polling` you can manage your observers.

### Define observer(s)

```js
this.$polling.addObserver(url)
```

or with opts:

```js
this.$polling.addObserver(url, {
    interval: 5000,  // 2000ms by default
    maxFails: 10,    // break after 10 (5 by defualt) continuous failures
    headers: {
        'Content-Type': 'application/json'
    }
})
```

As soon as your call `addObserver()`, the observer you just defined would start to fire the polling calls.

> **NOTE**
> * The url is the unique key of an observer. No duplicated observers of the same url in your whole Vue project.

### Stop and remove observers

```js
this.$polling.removeObserver(url)
```

## Listeners

Listeners are normally defined and manipulated in Vue components.
The package provides the mixin that injects `listeners` object in `this.$options`.

### Define listener(s)

```js
this.$options.listeners['url1'] = (resp) => {
    // do with HTTP response object
}
```

### Remove listener(s)

```js
delete this.$options.listeners['url1']
```

This will delete all callbacks defined in this vm for the url 'url1'.

> **Explanation**
> * You can define multiple callbacks to one single url. That means if you execute the code in 'Define a listner' twice, you would get two callbacks for that url. And it's possible to define same callbacks for same url but in different Vue components.
> * When you delete listeners in a Vue component with a url, you are deleting all callbacks you've defined in that Vue component with the same url. But it would not affect callbacks defined in other Vue components with the same url.
