var margin = {top: 0, right: 0, bottom: 0, left: 0}
var padding = {top: 0, right: 0, bottom: 0, left: 0}
var outerWidth = 1000
var outerHeight = 700
var innerWidth = outerWidth - margin.left - margin.right
var innerHeight = outerHeight - margin.top - margin.bottom
var width = innerWidth - padding.left - padding.right
var height = innerHeight - padding.top - padding.bottom
var aspect = width/height
var backgroundColor = "rgba(255, 255, 255, 0)"

var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height)
	.attr('id', 'chart')


var projection = d3.geo.mercator()
	.center([-73.94, 40.70])
	.scale(90000)
	.translate([(width) / 2, (height)/2]);


var path = d3.geo.path()
	.projection(projection)


d3.json('parking.geojson', function(parking) {

	// svg.append('g')
	// 	.attr('id', 'parking')
	// 	.selectAll('path')
	// 	.data(parking.features)
	// 	.enter().append('path')
	// 	.attr('d', path)
	// 	.style('sttroke-width', .1)

	var signProjection = d3.select('svg')
		.selectAll('circle')
		.data(parking.features)
		.enter()
		.append('circle')
		.attr('cx', function(d) {
			var coords = d.geometry.coordinates
			return projection([coords[0], coords[1]])[0]
		})
		.attr('cy', function(d) {
			var coords = d.geometry.coordinates
			return projection([coords[0], coords[1]])[1]
		})
		.attr('r', .25)
		.attr('class', 'data')
		.style('fill', 'blue')


})


