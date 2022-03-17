import i18n from '@/il8n'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
