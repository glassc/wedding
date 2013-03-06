var instance = null;


global.define = function(dependencies, defined_module)
{    
	if( dependencies === null )
		instance = dependencies;
	else
		instance = defined_module;
}

module.exports = function(mod, dependencies) {
	require(mod);
	return instance.apply(instance, dependencies);
}