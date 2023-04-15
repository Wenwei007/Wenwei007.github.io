// 数据
const data = [
    { category: 'A', value: 10, line1: 5, line2: 15 },
    { category: 'B', value: 25, line1: 15, line2: 20 },
    { category: 'C', value: 15, line1: 20, line2: 10 },
    { category: 'D', value: 20, line1: 10, line2: 25 },
];

// SVG容器
const svg = d3.select('svg');
const margin = { top: 20, right: 20, bottom: 50, left: 60 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// x轴和y轴
const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);

const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

x.domain(data.map((d) => d.category));
y.domain([0, d3.max(data, (d) => Math.max(d.value, d.line1, d.line2))]);


// x轴
g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('fill', '#FFFFFF')
    .attr('text-anchor', 'middle')
    .text('Category');
// Set the fill color of x-axis text to white
g.selectAll('.axis--x text').attr('fill', '#FFFFFF');



// y轴
g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(10))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('x', -(height / 2))
    .attr('fill', '#FFFFFF')
    .attr('text-anchor', 'middle')
    .text('Value');
// Set the fill color of y-axis text to white
g.selectAll('.axis--y text').attr('fill', '#FFFFFF');


// 提示框
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'bg-light border rounded p-2')
    .style('position', 'absolute')
    .style('display', 'none');

// 条形图
g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.category))
    .attr('y', height)
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .on('mouseover', function(event, d) {
        tooltip.style('display', 'inline-block');
        tooltip.html(`Category: ${d.category}<br/>Value: ${d.value}`);
    })
    .on('mousemove', (event) => {
        tooltip.style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 35) + 'px');
    })
    .on('mouseout', () => {
        tooltip.style('display', 'none');
    });

// 动画效果
g.selectAll('.bar')
    .transition()
    .duration(800)
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value));

// 折线图
const line1 = d3.line()
    .x((d) => x(d.category) + x.bandwidth() / 2)
    .y((d) => y(d.line1));

const line2 = d3.line()
    .x((d) => x(d.category) + x.bandwidth() / 2)
    .y((d) => y(d.line2));

// 添加折线图1
const path1 = g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'yellow')
    .attr('stroke-width', 2)
    .attr('d', line1);

const path1Length = path1.node().getTotalLength();

path1.attr('stroke-dasharray', path1Length + ' ' + path1Length)
    .attr('stroke-dashoffset', path1Length)
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0);


// 添加折线图2
const path2 = g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('d', line2);

const path2Length = path2.node().getTotalLength();

path2.attr('stroke-dasharray', path2Length + ' ' + path2Length)
    .attr('stroke-dashoffset', path2Length)
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0);