import React from 'react';

import {ModalRoot, ModalCard} from '@vkontakte/vkui';

const Modal = ({activeModal, currentTitle, currentCaption, actionFlag, onCloseModal, onAction, currentButtonText}) => (
    <ModalRoot activeModal={activeModal}>
        <ModalCard
            id={'MY_MODAL'}
            onClose={() => onCloseModal()}
            title={currentTitle}
            caption={currentCaption}
            actions={[{
                title: currentButtonText,
                type: 'primary',
                action: () => onAction(actionFlag)
            }]}
        >
        </ModalCard>
    </ModalRoot>
);

export default Modal;
