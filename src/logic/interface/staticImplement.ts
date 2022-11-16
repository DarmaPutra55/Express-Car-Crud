export default function staticDecorator<T>() {
    return (constructor: T) => {};
}