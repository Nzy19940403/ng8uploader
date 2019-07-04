import {coerceBooleanProperty} from '@angular/cdk/coercion'

export function InputBoolean():any{
    //将输入变成boolean
    return propDecoratorFactory('InputBoolean',toBoolean)
}
export function toBoolean(value:boolean | string){
    return coerceBooleanProperty(value)
}
/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using @InputBoolean alone without @Input? AOT needs @Input to be visible
 *
 * @howToUse
 * ```
 * @Input() @InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // @Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
    // tslint:disable-next-line: no-any
   
    function propDecorator(target: any, propName: string): void {
     
        const privatePropName = `$$__${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        Object.defineProperty(target, propName, {
            get(): string {
                return this[privatePropName]; // tslint:disable-line:no-invalid-this
            },
            set(value: T): void {
                this[privatePropName] = fallback(value); // tslint:disable-line:no-invalid-this
            }
        });
    }

    return propDecorator;
}

