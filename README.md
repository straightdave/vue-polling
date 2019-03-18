# vue-polling
vue plugin for polling backend APIs


## Observers

```js
this.$polling.addObserver(url) // then polling requests would be fired
```

or with opts:
```js
this.$polling.addObserver(url, {
    interval: 5000 // 1000ms by default
})
```

Stop and remove observers:
```js
this.$polling.removeObserver(url)
```

## Listeners

Listeners are normally defined and manipulated in components.

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

## Heads up

* Observers and listeners are pretty
