type OnChange<T> = (changed: T) => void 

export default class ChangeManager<K, V> {
    private __subscribers: Map<K, Set<OnChange<V>>> = new Map();

    changed = (elements: [K, V][]) => {
        elements.forEach(([k, v]) => {
            const subscribers = this.__subscribers.get(k);
            if (!subscribers)
                return;
            subscribers.forEach((change) => change(v));
        });
    };

    subscribe = (key: K, onChange: OnChange<V>) => {
        const set = this.__subscribers.has(key) ? this.__subscribers.get(key)! : (() => { 
            // create new Set and add it to __subscribers
            const s = new Set<OnChange<V>>();
            this.__subscribers.set(key, s);
            return s;
        })();
        
        set.add(onChange);

        return () => this.unsubscribe(key, onChange);
    }

    unsubscribe = (key: K, value: OnChange<V>): boolean => {
        const onChangeList = this.__subscribers.get(key);
        if (!onChangeList)
            return false;
        // if it's last subscriber delete key
        if (onChangeList.size === 1) {
            this.__subscribers.delete(key);
            return true;
        }
        
        return onChangeList.delete(value);;
    }
}