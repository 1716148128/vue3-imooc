import formula from '@/constant/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'
/**
 * 把生成的样式表写入到 style 中
 */
export const writeNewStyle = newStyle => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色，生成最新的样式表
 */
export const generateNewStyle = async parimartColor => {
  // 1. 根据主色生成色值表
  const colors = generateColors(parimartColor)
  // 2. 获取当前 element-plus 的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3. 遍历生成的色值表，在 默认样式表 进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

export const generateColors = primary => {
  if (!primary) return
  const colors = {
    primary
  }

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表
 */
export const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

/**
 * 把需要进行替换的色值打上标记
 */
const getStyleTemplate = data => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#337ecc': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
