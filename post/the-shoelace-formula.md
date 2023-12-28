---
title: 鞋带公式：计算任意多边形的面积
date: 2023-12-23
tags:
  - til
  - math
draft: false
---

[Advent of Code 2023 Day 18](https://adventofcode.com/2023/day/18) 涉及到求多边形的面积问题，
了解到一个简单的算法：鞋带公式。

鞋带公式（Shoelace formula）也称为高斯面积公式或者测量员公式，可以用来
求解任意没有相交区域的简单多边形的面积。计算方法为逆时针选取多边形每个
顶点的坐标交叉相乘，像系鞋带一样，比如假设一个多边形的坐标点为
$`(x_1, y_1)\enspace(x_2, y_2)\enspace(x_3, y_3)\enspace(x_4, y_4)`$，计算公式则为：
$`\frac{1}{2}\big((x_1 * y_2 + x_2 * y_3 + x_3 * y_4) - (y_1 * x_2 + y_2 * x_3 + y_3 * x_4)\big)`$.

<img src="/static/images/Shoelace3.png" alt="Shoelaces" width="150" />

为什么可以这样？一个简单直观的理解是把多边形的中心设定为原点 $`(0, 0)`$，
每两个相邻的坐标点和原点就构成了一个三角形，这个多边形就是由这些三角形
构成的，而三角形的面积就是对应平行四边形面积的一半，这里如果用中学
的几何知识 `底*高` 来计算平行四边形面积，不太好推导出鞋带公式，而用基础的
线性代数知识来计算平行四边形面积就很好理解：从原点到坐标点构成了一个向量，
两个向量的[叉积（cross product）](https://zh.wikipedia.org/zh-cn/%E5%8F%89%E7%A7%AF#%E5%87%A0%E4%BD%95%E6%84%8F%E4%B9%89)
就是它们构成的平行四边形的面积。

```math
\det(\mathbf{\overrightarrow{A}},\mathbf{\overrightarrow{B}})=
\mathbf{\overrightarrow{A}}\times\mathbf{\overrightarrow{B}}=
\begin{vmatrix*}[r]
x_1&y_1 \\
x_2&y_2
\end{vmatrix*}=
x_1y_2-x_2y_1
```

这样，鞋带公式怎么来的就比较容易理解了。更详细的说明参考[这个视频](https://www.youtube.com/watch?v=0KjG8Pg6LGk)。

## 叉积的几何意义

为什么两个向量的叉积就是它们构成的平行四边形面积？正好可以回顾一下去年底学了几节
[MIT 18.02: Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
关于向量和矩阵的部分。

回到最基础的平行四边形面积的一半来计算三角形面积：

![三角形面积](/static/images/triangle-area.png){width="300"}

其中三角形的高是 $`\mathbf{|\overrightarrow{B}|}\sin \theta`$。
我们把向量 $`\mathbf{\overrightarrow{A}}`$ 旋转 90 度得到 $`\mathbf{\overrightarrow{A\prime}}`$：

![rotate 90](/static/images/rotate-vector-a.png){width="300"}

其中 $`\mathbf{|\overrightarrow{A}|}=\mathbf{|\overrightarrow{A\prime}|}`$ 长度相等，所以
$`\mathbf{|\overrightarrow{A}|}\mathbf{|\overrightarrow{B}|}\sin(\theta)=\mathbf{|\overrightarrow{A\prime}|}\mathbf{|\overrightarrow{B}|}\cos(\theta')=\mathbf{\overrightarrow{A\prime}}\cdot \mathbf{\overrightarrow{B}}`$.

$`\mathbf{\overrightarrow{A\prime}}\cdot \mathbf{\overrightarrow{B}}`$ 叫做点乘（dot product）。

## 点乘的几何意义

首先，二维向量的减法在图形上是这样的：

![dot product](/static/images/dot-product.svg)

根据 [the law of cosines](https://en.wikipedia.org/wiki/Law_of_cosines):
(如果 $\theta$ 是 $90 \degree$ 就是勾股定理)

```math
|\mathbf{A}-\mathbf{B}|^2=|\mathbf{A}|^2+|\mathbf{B}|^2-2|\mathbf{A}||\mathbf{B}|cos \theta
```

$`\Rightarrow (a_1^2+a_2^2)+(b_1^2+b_2^2)-((a_1-b_1)^2+(a_2-b_2)^2)=2|\mathbf{A}||\mathbf{B}|cos \theta`$

$`\Rightarrow a_1b_1+a_2b_2=|\mathbf{A}||\mathbf{B}|cos \theta`$

$`\Rightarrow \mathbf{A}\cdot \mathbf{B}=|\mathbf{A}||\mathbf{B}|cos \theta`$

这就引申出了点乘的定义：$`\mathbf{A}\cdot \mathbf{B}=\sum a_ib_i=a_1b_1+a_2b_2+a_3b_3+\cdots`$

之前我们把向量 $`\mathbf{\overrightarrow{A}}=\langle a_1, a_2\rangle`$ 旋转 90 度得到
$`\mathbf{\overrightarrow{A\prime}}=\langle -a_2, a_1\rangle`$

![rotated 90](/static/images/vector-a-rotated-90.png)

所以 $`\mathbf{\overrightarrow{A\prime}}\cdot \mathbf{\overrightarrow{B}}=-a_2b_1 + a_1b_2=a_1b_2 - a_2b_1`$

从而，三角形的面积 =

```math
\frac{1}{2}\mathbf{|\overrightarrow{A}|}\mathbf{|\overrightarrow{B}|}\sin(\theta)=
\frac{1}{2}\mathbf{|\overrightarrow{A\prime}|}\mathbf{|\overrightarrow{B}|}\cos(\theta')=
\frac{1}{2}\mathbf{\overrightarrow{A\prime}}\cdot \mathbf{\overrightarrow{B}}=
\frac{1}{2}(a_1b_2 - a_2b_1)=
\frac{1}{2}\mathbf{\overrightarrow{A}}\times \mathbf{\overrightarrow{B}}
```

得证。

以上，构成了鞋带公式的基础。
