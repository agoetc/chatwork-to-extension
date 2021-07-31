import { ToListDomGetter } from '../../../adapter/dom/getter/original/ToListDomGetter'
import { OpenGroupDialogButtonPreparer } from '../../../adapter/dom/preparer/original/OpenGroupDialogButtonPreparer'

export const OpenGroupDialogButtonAppender = {
  append(): void {
    const groupButton = OpenGroupDialogButtonPreparer.prepare()
    const toListFooter = ToListDomGetter.getToListFooter()
    toListFooter.appendChild(groupButton)
  },
}
