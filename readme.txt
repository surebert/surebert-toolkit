Dropped support for IE 7
dropped sb.$$

$ returns actual array instead of object with nodes property

got rid of sb.nodesList.prototype.firePerNode, use forEach

redefined sb.nodeList.prototype.add as push as it is now an array directly

removed sb.nodeList.prototype.getElementPrototypes 

redefined sb.nodeList.empty

moving Element.prototypes to sb.nodeList.prototype
moved
	attr
	styles
	getStyle
	setStyle
addClassName
hasClassName - returns true if all have it
removeClassName
html