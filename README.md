# vue-polling
Vue plugin for polling backend APIs


## Observers

```js
this.$polling.addObserver(url) // then polling requests would be fired
```

or with opts:

```js
this.$polling.addObserver(url, {
    interval: 5000, // 2000ms by default
    maxFails: 10,    // break after 5 continuous failures
    headers: {
        'Content-Type': 'application/json'
    }
})
```

Stop and remove observers:

```js
this.$polling.removeObserver(url)
```

## Listeners

Listeners are normally defined and manipulated in components.
The package provides the mixin that injects `listeners` object in `this.$options`.

> Currently supporting only one callback for one url in a component.

Define a listener:

```js
this.$options.listeners['url1'] = (resp) => {
    // do with HTTP response object
}
```

Remove a listener:

```js
delete this.$options.listeners['url1']
```

> Actually all listeners of such component would be removed automatically at `beforeDestroy` provided by the mixin.
