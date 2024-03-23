/**
 * @name 3DTiltJS
 * @abstract Add 3D tilting effect to a container 
 * @version 1.0.0
 * @author LucentDread 
 * @link https://github.com/LucentDread/3DTiltJS
 */
let map = (value, inMin, inMax, outMin, outMax) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

document.addEventListener("DOMContentLoaded", () => {

	let style = document.createElement("style")
	style.innerHTML = `
	.wrap {
		perspective: 1600px;
		transform: scale(0.5);
	}

	.tilting {
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
		transition: transform 0.1s linear, box-shadow 0.1s linear;
		transform: scale(1.5);
	}`
	document.head.append(style)

	document.querySelectorAll(".tilting").forEach(el => {
		el.addEventListener("mousemove", e => {
			let boundingClientRect = el.getBoundingClientRect()

			let mouseX = Math.min(Math.max(0, e.clientX - boundingClientRect.left), el.clientWidth)
			let mouseY = Math.min(Math.max(0, e.clientY - boundingClientRect.top), el.clientHeight)
			let maxShear = Math.min(parseInt(el.dataset["maxshear"]) || 0.001, 0.01)
			let maxShadow = parseInt(el.dataset["maxshadow"]) || (Math.min(el.clientHeight, el.clientWidth) / 30)
			let shearZX = map(mouseX, 0, el.clientWidth, -maxShear, maxShear)
			let shearZY = map(mouseY, 0, el.clientHeight, -maxShear, maxShear)
			let shadowX = map(mouseX, 0, el.clientWidth, maxShadow, -maxShadow)
			let shadowY = map(mouseY, 0, el.clientHeight, maxShadow, -maxShadow)
			el.style.boxShadow = `${shadowX}px ${shadowY}px ${maxShadow * 2}px ${maxShadow}px rgba(0,0,0,.5)`
			el.style.transform = `matrix3d(1,0,0.00,${shearZX},0.00,1,0.00,${shearZY},0,0,1,0,0,0,0,1) scale(1.55) perspective(1600cm)`
		})
		el.addEventListener("mouseleave", e => {
			el.style.transform = ""
			el.style.boxShadow = ""
		})
	})
})