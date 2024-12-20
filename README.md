# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/types — объявление типов, используемых в проекте
- src/types/components — объявление типов компонентов, используемых в проекте
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
- src/types/settings.ts - файл с определением типов настроек приложения

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

Для реализации связи между Model и View используется паттерн **брокер событий** реализованный через класс `EventEmitter`.

- **Model**:
  - Отвечает за управление данными и бизнес-логикой приложения.
  - Включает определение типов данных приложения:`Product`, `ProductCatalog`, `Order`.
  - Взаимодействует с API через класс `LarekAPI` для получения и обновления данных о товарах.
  - Определяет состояние приложения через интерфейс `AppState`, который сохраняет информацию о каталоге товаров, текущем состоянии корзины покупателя, а также текущем состоянии приложения и данные, необходимых для оформления заказа.
  - Использует `EventEmitter` для оповещения View и Controller об изменениях в данных.

- **View**:
  - Не содержит бизнес-логики и отвечает за отображение пользовательского интерфейса.
  - Включает компоненты для отображения каталога товаров, информации о товаре, содержимого корзины и форм оформления заказа.
  - Реализована в трех типах:
    - `common`: общие компоненты, не зависящие о доменной области проекта.
    - `partial`: компоненты, реализующие доменную область приложенния.
    - `screen`: верхнеуровневые компоненты, которые являются экранными элементами.
 
- **Controller**:
  - Обеспечивает взаимодействие между `Model` и `View`.
  - Реализует логику обработки пользовательских запросов, таких как добавление и удаление товаров из корзину, и оформление заказа.
  - Устанавливает слушателей для событий модели, чтобы своевременно обновлять `View` в ответ на изменения.

## Описание внутренних типов, используемых в приложении

### Тип `ApiListResponse<Type>`
- **Описание**: Универсальный тип для ответа API, содержащий общее количество элементов (`total`) и массив элементов (`items`).

### Enum `TPaymentType`
- **Описание**: Определяет типы доступных способов оплаты.
- **Значения**:
  - `card`: Оплата картой онлайн.
  - `cash`: Оплата при получении.

### Тип `TContacts`
- **Описание**: Контактная информация покупателя.
- **Поля**:
  - `email: string`: Электронная почта.
  - `phoneNumber: string`: Номер телефона.

### Тип `TPaymentAddress`
- **Описание**: Содержит информацию о типе оплаты и адресе доставки.
- **Поля**:
  - `payment: TPaymentType`: Тип оплаты.
  - `address: string`: Адрес доставки.
  
## Описание базовых классов

### Класс `View`

Класс `View` предоставляет базовый интерфейс для работы с DOM-элементами и отображением данных. Он используется в качестве родительского класса для других компонентов, чтобы обеспечивать единый способ отображения данных и их обновления.

#### Атрибуты:
- **`element: HTMLElement`**: Корневой элемент DOM, с которым работает этот вид. Используется для вставки, обновления и удаления содержимого представления.

#### Методы:
- **`copy(setting?: S): IView<T>`**:
  - Создает копию текущего представления с возможностью передачи настроек (`setting`).
  - Возвращает новый экземпляр `IView` с тем же типом данных.
  - Полезно для создания дублирующихся компонентов с небольшими изменениями в настройках.

- **`render(data?: Partial<T>): HTMLElement`**:
  - Отображает данные в DOM-элементе `element`.
  - Принимает объект `data` типа `Partial<T>`, что позволяет обновлять только часть данных.
  - Возвращает обновленный элемент `HTMLElement` после рендеринга.
  - Используется для обновления отображения компонента без необходимости полного пересоздания DOM-элемента.

### Класс `Screen`

Абстрактный класс `Screen` служит базой для создания экранных компонентов в приложении. Он наследует от класса `View`, предоставляя общую функциональность для работы с экранными элементами. `Screen` принимает настройки для конфигурирования отображения и поведения, но не используется напрямую, а предназначен для наследования конкретными экранами.

#### Конструктор:
- **`constructor(settings: S)`**: Создает экземпляр `Screen` с заданными настройками, используя их для конфигурирования. Наследует функциональность от `View`.

### Класс `Api`

`Api` — базовый класс для взаимодействия с RESTful API. Он поддерживает выполнение GET и POST запросов, обработку ответов и настройку заголовков.

- **Атрибуты**:
  - `baseUrl: string`: Базовый URL для API-запросов.
  - `_options: RequestInit`: Опции для настройки запросов, включая заголовки.

- **Конструктор**:
  - `constructor(baseUrl: string, options: RequestInit = {})`: Инициализирует `Api` с базовым URL и настройками, включая заголовок `Content-Type: application/json`.

- **Методы**:
  - `_handleResponse<T>(response: Response): Promise<T>`: Обрабатывает ответ от сервера, возвращает JSON или ошибку.
  - `_get<T>(uri: string): Promise<T>`: Выполняет GET-запрос по заданному URI.
  - `_post<T>(uri: string, data: object): Promise<T>`: Выполняет POST-запрос с передачей данных.

### Класс `EventEmitter`

`EventEmitter` — класс для управления подпиской на события, их вызовом и отменой. Он используется для организации асинхронного взаимодействия между компонентами через события.

- **Атрибуты**:
  - `events: EventsMap`: Коллекция событий и связанных с ними обработчиков.

- **Конструктор**:
  - `constructor()`: Инициализирует `EventEmitter` с пустой коллекцией событий.

- **Методы**:
  - `on(eventName: string, handler: EventHandler)`: Регистрирует обработчик события для указанного имени события.
  - `off(eventName: string, handler: EventHandler)`: Удаляет обработчик для указанного имени события.
  - `emit(eventName: string, data: object)`: Вызывает все обработчики, связанные с указанным именем события, передавая им данные.
  - `reset()`: Очищает все зарегистрированные события и обработчики.
  - `bindEmitter(events: EventsMap)`: Заменяет текущую коллекцию событий на указанную.

## Описание классов модели

### Класс `LarekAPI`
- Предоставляет интерфейсы для взаимодействия с API онлайн-магазина.
- **Методы**:
  - `getProducts(): Promise<IProductCatalog>`: Получает каталог товаров магазина через вызов API `GET {{baseUrl}}/product`
  - `getProductDetails(id: string): Promise<IProduct>`: Получает подробную информацию о товаре через вызов `GET {{baseUrl}}/product/<id>`
  - `createOrder(order: IOrder): Promise<IOrderResult>`: Перелавет данные заказа и возвращает результат создания заказа через вызов API `POST {{baseUrl}}/order`.

### Класс `AppState`
- Описывает состояние приложения.
- **Атрибуты**:
  - `products: IProductCatalog`: Каталог товаров, загруженный с сервера.
  - `userOrder: IOrder`: Корзина и данные заказа покупателя.
  - `isOrderReady(): boolean`: Проверяет, что заказ корректно сформирован.
  - `openedModal: AppStateModals`: Текущее открытое модальное окно.
- **Методы**:
  - `setProductCatalog(products: IProductCatalog): void`: Создает каталог товаров.
  - `addToBasket(id: string): void`: Добавляет товар к заказу по `id`.
  - `removeFromBasket(id: string): void`: Удаляет товар из заказа по `id`.
  - `getBasketTotal(): number`: Возвращает число товаров в корзине.
  - `getBasketItems(): IProduct[]`: Возвращает список товаров в корзине.
  - `fillAddress(address: TPaymentAddress): void`: Добавляет в заказ данные по способу оплаты и адресу доставки.
  - `fillContacts(contats: TContacts): void`: Добавляет в заказ контактные данные покупателя.
  - `getOrder(): IOrder`: Возвращает данные заказа покупателя.
  - `openModal(modal: AppStateModals): void`: Открывает выбранное пользователем модельное окно.
  - `formatCurrency(value: number): string`: Конвертирует цену/сумму в строковое представление с учетом валюты.

### Класс `AppStateSettings`
- Отвечает за настройку состояния приложения
- **Методы**:
  - `formatCurrency(value: number): string`: Реализует конвертации цен из `number` в `string` с учетом валюты приложения
  - `onChange(changed: AppStateChanges): void`: Реализует изменение состояния приложения

### Класс `AppStateConstructor`
- Конструктор приложения `(api: ILarekAPI, settings: AppStateSettings): AppState`:
  - Принимает экземпляр API и конфигурации приложения
  - Возвращает объект приложения

## Описание событийной модели

### Enum `AppStateModals`
- Определяет возможные состояния модальных окон приложения.
- **Значения**:
  - `none`: Модальное окно закрыто.
  - `product`: Модальное окно с информацией о товаре.
  - `basket`: Модальное окно корзины.
  - `order`: Модальное окно для ввода адреса доставки.
  - `contacts`: Модальное окно для ввода контактной информации.
  - `success`: Модальное окно успешного завершения заказа.

### Enum `AppStateChanges`
  - Определяет типы изменений, которые могут происходить в состоянии приложения.
  - **Значения**:
    - `selectedProduct`: Изменение выбранного продукта.
    - `modal`: Изменение состояния модальных окон.
    - `basket`: Изменение состояния корзины.
    - `order`: Изменение текущего заказа.

## Описание классов отображения

Классы отображения обеспечавают представление данных в элементах интерфейс приложения. Каждый класс отображения приложения наследуется базового класса `View`.:

### `Common`

Описывает общие классы, не зависящие от доменной области приложения

### Класс `ListView`

Класс `List` управляет отображением коллекции элементов на основе переданных данных и настроек.

#### Атрибуты:
- **`items<T>[]`**: Элемент списка, содержащие массив элементов типа `T`.
- **`settings: ListSettings<T>`**: Настройки списка, включающие вид отображения элемента (`item`) и CSS-класс (`itemClass`).
- **`_elements: ElementsMap`**: Cвязывает идентификаторы элементов списка с их HTML-представлением.

### Класс `ModalView`

Класс `ModalView` управляет отображением и поведением модального окна. Он позволяет отобразить содержимое, обработать ошибки и выполнять действия при открытии и закрытии модального окна.

#### Атрибуты:
- **`data: ModalData<C>`**: Данные модального окна, включающие содержимое (`content`), флаг активности (`isActive`), опциональное сообщение (`message`) и флаг ошибки (`isError`).
- **`settings: ModalSettings<C>`**: Настройки модального окна, включающие селекторы для элементов управления, отображение содержимого, действия при открытии и закрытии, а также классы для стилей.
- **`contentView: IView<C>`**: Вид, используемый для отображения содержимого модального окна.

#### Методы:
- **`open(): void`**:
  - Открывает модальное окно, устанавливая `isActive` в `true` и отображает содержимое.
  - Выполняет `onOpen`, если он задан в настройках.
- **`close(): void`**:
  - Закрывает модальное окно, устанавливая `isActive` в `false` и скрывает содержимое.
  - Выполняет `onClose`, если он задан в настройках.
- **`setContent(content: C): void`**:
  - Устанавливает новое содержимое для отображения в модальном окне.
  - Обновляет вид `contentView` с новым содержимым.
- **`showError(message: string): void`**:
  - Отображает сообщение об ошибке в модальном окне.
  - Добавляет класс ошибки (`errorMessageClass`) для визуального выделения ошибки.

### Класс `UserFormView`

Класс `UserFormView` управляет состоянием и поведением формы для ввода пользовательских данных. Он позволяет обрабатывать изменения, управлять доступностью формы и отображать сообщения пользователю.

#### Атрибуты:
- **`data: UserFormData<T>`**: Данные формы, включающие:
  - `data: T`: Данные, введенные пользователем.
  - `isActive: boolean`: Указывает, активна ли форма.
  - `isDisabled: boolean`: Указывает, доступна ли форма для ввода.
  - `message: string`: Сообщение, отображаемое пользователю (например, успешное выполнение или ошибка).
  - `isError: boolean`: Флаг, указывающий, является ли текущее сообщение ошибкой.

- **`settings: UserFormSettings<T>`**: Настройки формы, включающие:
  - `onChange: (data: T) => void`: Функция-обработчик, вызываемая при изменении данных формы.
  - `onClose: () => void`: Функция-обработчик, вызываемая при закрытии формы.
  - `onNext: () => void`: Функция-обработчик, вызываемая при переходе к следующему шагу.

#### Методы:
- **`submit(data: T): void`**:
  - Отправляет данные формы и вызывает `onChange` из настроек для обработки изменений.
  - Обновляет внутреннее состояние формы с новыми данными.

- **`close(): void`**:
  - Закрывает форму, устанавливая `isActive` в `false` и вызывает `onClose` из настроек.
  - Убирает сообщение и сбрасывает состояние ошибки.

- **`disable(): void`**:
  - Деактивирует форму, устанавливая `isDisabled` в `true`.
  - Полезно при ожидании завершения асинхронных операций.

- **`enable(): void`**:
  - Активирует форму, устанавливая `isDisabled` в `false`.
  - Позволяет пользователю снова вводить данные.

- **`showMessage(message: string, isError: boolean = false): void`**:
  - Отображает сообщение в форме, например, о результатах отправки данных или о произошедшей ошибке.
  - Обновляет флаг `isError` для соответствующего отображения сообщений.

### Partial

### Класс `PageView`

Класс `PageView` управляет состоянием страницы и взаимодействием с основными компонентами, такими как корзина и счетчик. Он реализует интерфейс `IClickable` для обработки событий кликов на странице.

#### Атрибуты:
- **`data: PageData`**: Данные страницы, включающие:
  - `counter: number`: Значение счетчика, используемое для отслеживания количества определенных действий на странице.

- **`settings: PageSettings`**: Настройки страницы, включающие:
  - `wrapper: string`: Селектор контейнера страницы, который используется для привязки событий и отображения содержимого.
  - `counter: string`: Селектор элемента, отображающего значение счетчика.
  - `basket: string`: Селектор элемента корзины на странице, позволяющий взаимодействовать с корзиной.
  - **Методы из `IClickable`**: Наследуемые методы для обработки событий кликов на элементах страницы.


### Класс `CardView`

Класс `CardView` управляет отображением карточки товара, предоставляя информацию о категории, названии, изображении и цене товара. Он реализует интерфейс `IClickable` для обработки событий кликов по карточке.

#### Атрибуты:
- **`data: CardData`**: Данные карточки, включающие:
  - `id: string`: Идентификатор товара.
  - `category: string`: Категория, к которой относится товар.
  - `title: string`: Название товара.
  - `image: string`: URL изображения товара.
  - `price: string`: Цена товара в отформатированном виде.

- **`settings: CardSettings`**: Настройки отображения карточки, включающие:
  - `category: string`: Селектор элемента, отображающего категорию товара.
  - `title: string`: Селектор элемента, отображающего название товара.
  - `image: string`: Селектор элемента для изображения товара.
  - `price: string`: Селектор элемента, отображающего цену товара.
  - **Методы из `IClickable`**: Наследуемые методы для обработки событий кликов по карточке.

#### Методы:
- **`render(): void`**:
  - Отображает карточку товара на странице.
  - Обновляет элементы карточки в соответствии с переданными данными и настройками (`title`, `category`, `image`, `price`).

- **`onClick(event: MouseEvent): void`** (из `IClickable`):
  - Обрабатывает событие клика по карточке.
  - Может использоваться для открытия подробной информации о товаре или добавления его в корзину в зависимости от логики приложения.


### Класс `ProductView`

Класс `ProductView` управляет отображением информации о продукте, предоставляя данные о названии, описании, категории, изображении и цене. Класс позволяет адаптировать представление продукта с учетом компактного или полного режима отображения.

#### Атрибуты:
- **`data: ProductData`**: Данные продукта, включающие:
  - `title: string`: Название продукта.
  - `description: string`: Описание продукта.
  - `category: string`: Категория, к которой относится продукт.
  - `image: string`: URL изображения продукта.
  - `price: string`: Цена продукта в отформатированном виде.

- **`settings: ProductSettings`**: Настройки отображения продукта, включающие:
  - `image: string`: Селектор элемента для отображения изображения продукта.
  - `category: string`: Селектор элемента для отображения категории продукта.
  - `title: string`: Селектор элемента для отображения названия продукта.
  - `description: string`: Селектор элемента для отображения описания продукта.
  - `price: string`: Селектор элемента для отображения цены продукта.
  - `compactClass: string`: CSS-класс для компактного отображения продукта.
  - `isCompact: boolean`: Флаг, указывающий, отображается ли продукт в компактном режиме.

### Класс `OrderView`

Класс `OrderView` управляет информацией о заказе, включая способ оплаты и адрес доставки. Он реализует интерфейс `IClickable`, что позволяет обрабатывать события, связанные с заказом, например, выбор способа оплаты или изменение адреса.

#### Атрибуты:
- **`data: OrderData`**: Данные заказа, включающие:
  - `payment: TPaymentType`: Способ оплаты (например, `card` или `cash`).
  - `address: string`: Адрес доставки для текущего заказа.

- **`settings: OrderSettings`**: Настройки отображения заказа, включающие:
  - `payment: string`: Селектор элемента для отображения или выбора способа оплаты.
  - `address: string`: Селектор элемента для отображения или ввода адреса доставки.
  - **Методы из `IClickable`**: Наследуемые методы для обработки событий кликов, связанных с изменением данных заказа.

### Класс `ContactsView`

Класс `ContactsView` управляет отображением и редактированием контактной информации пользователя, включая электронную почту и номер телефона. Он реализует интерфейс `IChangeable` для обработки изменений в контактных данных.

#### Атрибуты:
- **`data: ContactsData`**: Данные контактов, включающие:
  - `email: string`: Электронная почта пользователя.
  - `phone: string`: Номер телефона пользователя.

- **`settings: ContactsSettings`**: Настройки отображения и редактирования контактов, включающие:
  - `email: string`: Селектор элемента для отображения или ввода электронной почты.
  - `phone: string`: Селектор элемента для отображения или ввода номера телефона.
  - **Методы из `IChangeable`**: Наследуемые методы для обработки изменений в контактных данных.

### Screen

### Класс `MainScreen`

Класс `MainScreen` управляет отображением и взаимодействием с Главной страницей приложения, на которой отображается список товаров в виде карточек и возможность открытия корзины. Он позволяет пользователю просматривать список товаров и взаимодействовать с отдельными карточками.

#### Атрибуты:
- **`data: MainData`**: Данные экрана, включающие:
  - `items: CardData[]`: Массив данных карточек товаров, отображаемых на экране.
  - `counter: number`: Счетчик, используемый для отслеживания количества определенных действий (например, добавление в корзину).

- **`settings: MainSettings`**: Настройки экрана, включающие:
  - `onOpenBasket: () => void`: Функция, вызываемая при открытии корзины.
  - `onOpenCard: (id: string) => void`: Функция, вызываемая при открытии детальной информации о карточке товара. Принимает `id` товара для идентификации выбранной карточки.

### Класс `BasketScreen`

Класс `BasketScreen` управляет отображением и взаимодействием с экраном корзины, на котором отображаются выбранные пользователем товары и их общая стоимость. Он предоставляет возможности для удаления товаров из корзины, перехода к следующему шагу оформления заказа и закрытия корзины.

#### Атрибуты:
- **`data: BasketData`**: Данные корзины, включающие:
  - `products: ProductData[]`: Массив продуктов, добавленных в корзину.
  - `total: string`: Общая стоимость всех товаров в корзине, отформатированная для отображения (например, с указанием валюты).

- **`settings: BasketSettings`**: Настройки корзины, включающие:
  - `onRemove: (id: string) => void`: Функция, вызываемая при удалении товара из корзины по его `id`.
  - `onClose: () => void`: Функция, вызываемая при закрытии экрана корзины.
  - `onNext: () => void`: Функция, вызываемая при переходе к следующему шагу оформления заказа.

### Класс `SuccessScreen`

Класс `SuccessScreen` управляет отображением сообщения об успешном завершении действия (например, успешного оформления заказа). Он позволяет отобразить текст сообщения и управлять видимостью экрана, а также предоставляет возможность закрытия экрана.

#### Атрибуты:
- **`data: SuccessData`**: Данные успешного сообщения, включающие:
  - `text: string`: Текст сообщения, который будет отображаться на экране.
  - `isActive: boolean`: Флаг, указывающий, отображается ли в данный момент экран успешного завершения.

- **`settings: SuccessSettings`**: Настройки экрана успешного завершения, включающие:
  - `onClose: () => void`: Функция, вызываемая при закрытии экрана. Используется для выполнения логики при закрытии экрана, например, для возвращения пользователя на предыдущую страницу.