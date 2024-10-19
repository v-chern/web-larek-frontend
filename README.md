# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание проекта

Проект "Web-ларёк" реализует базовый функционал типового интернет-магазина, в данном случае с товарами для разработчиков. Пользователь может просматривать каталог товаров, информацию о конкретном товаре, добавлять товары в корзину и оформить заказ. 


Для получения данных о товарах в магазине используется подключения по  API.

## Описание интерфейса

Интерфейс проекта:

- Просмотр каталога товаров
- Просмотр карточки товара
- Просмотр корзиры
- Оформление заказа

## Архитектрура проекта

Приложение построено по архитектуре **MVC (Model-View-Controller)** и использует **TypeScript** для строгой типизации данных.

Для реализации связи между Model и View используется паттерн **брокер событий** с классом `EventEmitter`.

- **Model**:
  - Отвечает за управление данными и бизнес-логикой приложения.
  - Включает типы и интерфейсы для описания данных (например, `IProduct`, `IBasket`, `IOrder`).
  - Взаимодействует с API через `ILarekAPI` для получения и обновления данных о товарах.
  - Определяет состояние приложения через интерфейс `AppState`, который сохраняет информацию о каталоге товаров, текущем состоянии корзины покупателя, а также текущем состоянии приложения и данные, необходимых для оформления заказа.
  - Использует `EventEmitter` для оповещения View и Controller об изменениях в данных.

- **View**:
  - Не содержит бизнес-логики и отвечает за отображение пользовательского интерфейса.
  - Включает компоненты для отображения каталога товаров, информации о товаре, содержимого корзины и форм оформления заказа.
  - Реализованы в трех типах:
    - `common`: общие компоненты, не зависящие о доменной области проекта.
    - `partial`: компоненты, реализующие доменную область приложенния.
    - `screen`: верхнеуровневые компоненты, которые являются экранными элементами.
 
- **Controller**:
  - Обрабатывает действия пользователя и координирует взаимодействие между `Model` и `View`.
  - Реализует логику обработки пользовательских запросов, таких как добавление товаров в корзину, оформление заказа или фильтрация товаров.
  - Получает данные от `Model`, обрабатывает их (например, добавляет товар в корзину) и передает обновленные данные `View` для отображения.
  - Устанавливает слушателей для событий модели, чтобы своевременно обновлять `View` в ответ на изменения.

## Описание модели данных

### `ApiListResponse<Type>`
- **Тип**: `type`
- **Описание**: Универсальный тип для ответа API, содержащий общее количество элементов (`total`) и массив элементов (`items`).

### `TPaymentType`
- **Тип**: `enum`
- **Описание**: Определяет типы доступных способов оплаты.
- **Значения**:
  - `card`: Оплата картой онлайн.
  - `cash`: Оплата при получении.

### `TContacts`
- **Тип**: `type`
- **Описание**: Контактная информация покупателя.
- **Поля**:
  - `email: string`: Электронная почта.
  - `phoneNumber: string`: Номер телефона.

### `TPaymentAddress`
- **Тип**: `type`
- **Описание**: Содержит информацию о типе оплаты и адресе доставки.
- **Поля**:
  - `payment: TPaymentType`: Тип оплаты.
  - `address: string`: Адрес доставки.

### `IProduct`
- **Тип**: `interface`
- **Описание**: Представляет товар в интернет-магазине.
- **Поля**:
  - `id: string`: Идентификатор товара.
  - `category: string`: Категория товара.
  - `title: string`: Название товара.
  - `description: string`: Описание товара.
  - `image: string`: путь к изображению товара.
  - `price: number`: Цена товара.

### `IProductCatalog`
- **Тип**: `interface`
- **Описание**: Каталог товаров с доступом по `id`.
- **Поля**:
  - `items: Map<string, IProduct>`: Список товаров в каталоге.
  - `itemsCount: number`: Общее количество товаров в каталоге. 
- **Методы**:
  - `getProduct(id: string): IProduct`: Получение товара по его `id`.

### `IBasket`
- **Тип**: `interface`
- **Описание**: Представляет корзину покупателя, наследуется от `IProductCatalog`.
- **Поля**:
  - `totalSum: number`: Общая сумма товаров в корзине.
- **Методы**:
  - `addProduct(id: string): void`: Добавить товар в корзину.
  - `removeProduct(id: string): void`: Удалить товар из корзины.

### `IOrder`
- **Тип**: `interface`
- **Описание**: Агрегирует информацию, необходимую для осуществления заказа.
- **Поля**:
  - `basket: IBasket`: Корзина с выбранными товара.
  - `paymentType: TPaymentType`: Тип оплаты.
  - `deliveryAddress: string`: Адрес доставки.
  - `email: string`: Электронная почта клиента.
  - `phoneNumber: string`: Номер телефона клиента.
- **Методы**:
  - `setPaymentAddress(pmtAddress: TPaymentAddress): void`: Установить адрес доставки и тип оплаты.
  - `setContacts(contacts: TContacts): void`: Установить контактную информацию.

### `IOrderResult`
- **Тип**: `interface`
- **Описание**: Результат создания заказа, наследуется от `IOrder`.
- **Поля**:
  - `id: string`: Уникальный идентификатор заказа.

### `ILarekAPI`
- **Тип**: `interface`
- **Описание**: Интерфейс для взаимодействия с API магазина.
- **Методы**:
  - `getProducts(): Promise<IProduct[]>`: Получить каталог товаров.
  - `getProductDetails(id: string): Promise<IProduct>`: Получить подробную информацию о товаре.
  - `createOrder(order: IOrder): Promise<IOrderResult[]>`: Создать заказ и получить его результат.

### `AppState`
- **Тип**: `interface`
- **Описание**: Описывает состояние приложения.
- **Поля**:
  - `products?: IProductCatalog`: Каталог товаров, загруженный с сервера.
  - `selectedProduct: IProduct | null`: Текущий выбранный товар для детального просмотра.
  - `userBasket: IBasket`: Корзина пользователя.
  - `userOrder: IOrder | null`: Текущий оформляемый заказ.
  - `openedModal: AppStateModals`: Текущее открытое модальное окно.
  - `isOrderReady: boolean`: Флаг, указывающий, готов ли заказ к отправке.

## Описание событийном модели

### `AppStateModals`
- **Тип**: `enum`
- **Описание**: Определяет возможные состояния модальных окон приложения.
- **Значения**:
  - `none`: Модальное окно закрыто.
  - `product`: Модальное окно с информацией о товаре.
  - `basket`: Модальное окно корзины.
  - `order`: Модальное окно для ввода адреса доставки.
  - `contacts`: Модальное окно для ввода контактной информации.
  - `success`: Модальное окно успешного завершения заказа.

- **`AppStateChanges`**:
  - **Тип**: `enum`
  - **Описание**: Определяет типы изменений, которые могут происходить в состоянии приложения.
  - **Значения**:
    - `selectedProduct`: Изменение выбранного продукта.
    - `modal`: Изменение состояния модальных окон.
    - `basket`: Изменение состояния корзины.
    - `order`: Изменение текущего заказа.
