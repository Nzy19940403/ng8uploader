

export function twBind(emiter:string,callback?):any{
    return propDecoratorFactory(emiter,'twBind',callback)
}
function propDecoratorFactory<T,D>(emiter:string,name:string,callback?:(v:T)=>D):(target:any,propName:string)=>void {
    function propDecorator(target:any,propName:string):void{
        
        const privatePropName = `_$N_${propName}`

        if(Object.prototype.hasOwnProperty.call(target,privatePropName)){
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }

        Object.defineProperty(target,privatePropName,{
            writable:true,
            configurable:true
        })
        Object.defineProperty(target,propName,{
            set(value:T):void{
                this[privatePropName] = callback?callback(value):value
                this[emiter].emit(this[privatePropName])
                
            },
            get(){
                return this[privatePropName]
            }
        })

        
    }
    return propDecorator

}