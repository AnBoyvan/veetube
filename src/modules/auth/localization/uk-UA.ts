import type { LocalizationResource } from '@clerk/types';

export const ukUA: LocalizationResource = {
	locale: 'uk-UA',
	backButton: 'Назад',
	badge__default: 'За замовчуванням',
	badge__otherImpersonatorDevice: 'Інший пристрій-двійник',
	badge__primary: 'Основний',
	badge__requiresAction: 'Потребує дії',
	badge__thisDevice: 'Цей пристрій',
	badge__unverified: 'Неперевірений',
	badge__userDevice: 'Пристрій користувача',
	badge__you: 'Ви',
	createOrganization: {
		formButtonSubmit: 'Створити організацію',
		invitePage: {
			formButtonReset: 'Пропустити',
		},
		title: 'Створити організацію',
	},
	dates: {
		lastDay: "Вчора в {{ date | timeString('uk-UA') }}",
		next6Days:
			"{{ date | weekday('uk-UA','long') }} в {{ date | timeString('uk-UA') }}",
		nextDay: "Завтра в {{ date | timeString('uk-UA') }}",
		numeric: "{{ date | numeric('uk-UA') }}",
		previous6Days:
			"Останній {{ date | weekday('uk-UA','long') }} в {{ date | timeString('uk-UA') }}",
		sameDay: "Сьогодні в {{ date | timeString('uk-UA') }}",
	},
	dividerText: 'або',
	footerActionLink__useAnotherMethod: 'Використовувати інший метод',
	footerPageLink__help: 'Допомога',
	footerPageLink__privacy: 'Приватність',
	footerPageLink__terms: 'Умови',
	formButtonPrimary: 'Продовжити',
	formButtonPrimary__verify: 'Підтвердити',
	formFieldAction__forgotPassword: 'Забули пароль?',
	formFieldError__matchingPasswords: 'Паролі збігаються.',
	formFieldError__notMatchingPasswords: 'Паролі не збігаються.',
	formFieldError__verificationLinkExpired:
		'Термін дії посилання для підтвердження закінчився. Запросіть нове посилання.',
	formFieldHintText__optional: "Необов'язково",
	formFieldHintText__slug:
		'Слаг — це зрозумілий ідентифікатор, який має бути унікальним. Часто використовується в URL-адресах.',
	formFieldInputPlaceholder__backupCode: 'Введіть резервний код',
	formFieldInputPlaceholder__confirmDeletionUserAccount: 'Видалити акаунт',
	formFieldInputPlaceholder__emailAddress: 'Введіть вашу електронну адресу',
	formFieldInputPlaceholder__emailAddress_username:
		'Введіть електронну адресу або імʼя користувача',
	formFieldInputPlaceholder__emailAddresses:
		'Введіть або вставте одну або більше адрес електронної пошти, розділених пробілами або комами',
	formFieldInputPlaceholder__firstName: "Ім'я",
	formFieldInputPlaceholder__lastName: 'Прізвище',
	formFieldInputPlaceholder__organizationDomain: 'example.com',
	formFieldInputPlaceholder__organizationDomainEmailAddress: 'you@example.com',
	formFieldInputPlaceholder__organizationName: 'Назва організації',
	formFieldInputPlaceholder__organizationSlug: 'my-org',
	formFieldInputPlaceholder__password: 'Введіть пароль',
	formFieldInputPlaceholder__phoneNumber: 'Введіть номер телефону',
	formFieldInputPlaceholder__username: "Ім'я користувача",
	formFieldLabel__automaticInvitations:
		'Увімкнути автоматичні запрошення для цього домену',
	formFieldLabel__backupCode: 'Код відновлення',
	formFieldLabel__confirmDeletion: 'Підтвердження',
	formFieldLabel__confirmPassword: 'Підтвердження пароля',
	formFieldLabel__currentPassword: 'Поточний пароль',
	formFieldLabel__emailAddress: 'Пошта',
	formFieldLabel__emailAddress_username: "Пошта або ім'я користувача",
	formFieldLabel__emailAddresses: 'Поштові адреси',
	formFieldLabel__firstName: "Ім'я",
	formFieldLabel__lastName: 'Прізвище',
	formFieldLabel__newPassword: 'Новий пароль',
	formFieldLabel__organizationDomain: 'Домен',
	formFieldLabel__organizationDomainDeletePending:
		'Видалити запрошення та пропозиції, що очікують',
	formFieldLabel__organizationDomainEmailAddress:
		'Електронна адреса для підтвердження',
	formFieldLabel__organizationDomainEmailAddressDescription:
		'Введіть електронну адресу цього домену, щоб отримати код підтвердження.',
	formFieldLabel__organizationName: 'Назва організації',
	formFieldLabel__organizationSlug: 'URL адреса',
	formFieldLabel__passkeyName: 'Назва ключа',
	formFieldLabel__password: 'Пароль',
	formFieldLabel__phoneNumber: 'Номер телефону',
	formFieldLabel__role: 'Роль',
	formFieldLabel__signOutOfOtherSessions: 'Вийти з усіх інших пристроїв',
	formFieldLabel__username: "Ім'я користувача",
	impersonationFab: {
		action__signOut: 'Вийти',
		title: 'Ви увійшли як {{identifier}}',
	},
	maintenanceMode:
		'Зараз тривають технічні роботи. Будь ласка, зачекайте декілька хвилин.',
	membershipRole__admin: 'Адміністратор',
	membershipRole__basicMember: 'Член',
	membershipRole__guestMember: 'Гість',
	organizationList: {
		action__createOrganization: 'Створити організацію',
		action__invitationAccept: 'Приєднатися',
		action__suggestionsAccept: 'Запит на приєднання',
		createOrganization: 'Створити організацію',
		invitationAcceptedLabel: 'Приєднано',
		subtitle: 'для переходу до {{applicationName}}',
		suggestionsAcceptedLabel: 'Очікує підтвердження',
		title: 'Оберіть акаунт',
		titleWithoutPersonal: 'Оберіть організацію',
	},
	organizationProfile: {
		badge__automaticInvitation: 'Автоматичні запрошення',
		badge__automaticSuggestion: 'Автоматичні пропозиції',
		badge__manualInvitation: 'Без автоматичного запрошення',
		badge__unverified: 'Непідтверджений',
		createDomainPage: {
			subtitle:
				'Додайте домен для підтвердження. Користувачі з цим доменом зможуть приєднуватися автоматично або надсилати запити.',
			title: 'Додати домен',
		},
		invitePage: {
			detailsTitle__inviteFailed:
				'Запрошення не вдалося надіслати. Виправте наступне і повторіть спробу:',
			formButtonPrimary__continue: 'Надіслати запрошення',
			selectDropdown__role: 'Оберіть роль',
			subtitle: 'Запросіть нових учасників до цієї організації',
			successMessage: 'Запрошення успішно надіслано',
			title: 'Запросити учасників',
		},
		membersPage: {
			action__invite: 'Запросити',
			action__search: 'Пошук',
			activeMembersTab: {
				menuAction__remove: 'Видалити учасника',
				tableHeader__actions: 'Дії',
				tableHeader__joined: 'Приєднався',
				tableHeader__role: 'Роль',
				tableHeader__user: 'Користувач',
			},
			detailsTitle__emptyRow: 'Немає учасників для відображення',
			invitationsTab: {
				autoInvitations: {
					headerSubtitle:
						'Запрошуйте користувачів, підключивши домен до вашої організації. Кожен, хто має відповідний домен, зможе приєднатися в будь-який час.',
					headerTitle: 'Автоматичні запрошення',
					primaryButton: 'Керування підтвердженими доменами',
				},
				table__emptyRow: 'Немає запрошень',
			},
			invitedMembersTab: {
				menuAction__revoke: 'Відкликати запрошення',
				tableHeader__invited: 'Запрошені',
			},
			requestsTab: {
				autoSuggestions: {
					headerSubtitle:
						'Користувачі з відповідним доменом побачать пропозицію надіслати запит на приєднання до вашої організації.',
					headerTitle: 'Автоматичні пропозиції',
					primaryButton: 'Керування підтвердженими доменами',
				},
				menuAction__approve: 'Затвердити',
				menuAction__reject: 'Відхилити',
				tableHeader__requested: 'Запити на доступ',
				table__emptyRow: 'Немає запитів',
			},
			start: {
				headerTitle__invitations: 'Запрошення',
				headerTitle__members: 'Учасники',
				headerTitle__requests: 'Запити',
			},
		},
		navbar: {
			description: 'Керування організацією.',
			general: 'Основне',
			members: 'Учасники',
			title: 'Організація',
		},
		profilePage: {
			dangerSection: {
				deleteOrganization: {
					actionDescription:
						'Введіть "{{organizationName}}" нижче, щоб продовжити.',
					messageLine1: 'Ви впевнені, що хочете видалити цю організацію?',
					messageLine2: 'Ця дія є незворотною.',
					successMessage: 'Організацію видалено.',
					title: 'Видалити організацію',
				},
				leaveOrganization: {
					actionDescription:
						'Введіть "{{organizationName}}" нижче, щоб продовжити.',
					messageLine1:
						'Ви впевнені, що хочете покинути цю організацію? Ви втратите доступ до організації та її додатків.',
					messageLine2: 'Ця дія є постійною і незворотною.',
					successMessage: 'Ви покинули організацію.',
					title: 'Покинути організацію',
				},
				title: 'Небезпечна зона',
			},
			domainSection: {
				menuAction__manage: 'Керувати',
				menuAction__remove: 'Видалити',
				menuAction__verify: 'Підтвердити',
				primaryButton: 'Додати домен',
				subtitle:
					'Дозвольте користувачам приєднуватися автоматично або надсилати запити на основі підтвердженого домену.',
				title: 'Підтверджені домени',
			},
			successMessage: 'Організацію оновлено.',
			title: 'Профіль організації',
		},
		removeDomainPage: {
			messageLine1: 'Домен {{domain}} буде видалено.',
			messageLine2:
				'Після цього користувачі не зможуть приєднуватися автоматично.',
			successMessage: 'Домен {{domain}} видалено.',
			title: 'Видалити домен',
		},
		start: {
			headerTitle__general: 'Основне',
			headerTitle__members: 'Учасники',
			profileSection: {
				primaryButton: 'Оновити профіль',
				title: 'Профіль організації',
				uploadAction__title: 'Логотип',
			},
		},
		verifiedDomainPage: {
			dangerTab: {
				calloutInfoLabel: 'Видалення домену вплине на запрошених користувачів.',
				removeDomainActionLabel__remove: 'Видалити домен',
				removeDomainSubtitle: 'Видалити цей домен зі списку підтверджених',
				removeDomainTitle: 'Видалити домен',
			},
			enrollmentTab: {
				automaticInvitationOption__description:
					'Користувачі автоматично отримують запрошення при реєстрації та можуть приєднатися будь-коли.',
				automaticInvitationOption__label: 'Автоматичні запрошення',
				automaticSuggestionOption__description:
					'Користувачі отримують пропозицію надіслати запит, який має затвердити адміністратор.',
				automaticSuggestionOption__label: 'Автоматичні пропозиції',
				calloutInfoLabel:
					'Зміна методу приєднання вплине лише на нових користувачів.',
				calloutInvitationCountLabel: 'Очікуючі запрошення: {{count}}',
				calloutSuggestionCountLabel: 'Очікуючі пропозиції: {{count}}',
				manualInvitationOption__description:
					'Користувачів можна запрошувати лише вручну.',
				manualInvitationOption__label: 'Без автоматичного приєднання',
				subtitle: 'Оберіть спосіб приєднання користувачів з цього домену.',
			},
			start: {
				headerTitle__danger: 'Небезпека',
				headerTitle__enrollment: 'Опції приєднання',
			},
			subtitle: 'Домен {{domain}} підтверджено. Оберіть метод приєднання.',
			title: 'Оновити {{domain}}',
		},
		verifyDomainPage: {
			formSubtitle:
				'Введіть код підтвердження, надісланий на вашу електронну адресу',
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Домен {{domainName}} потребує підтвердження через електронну пошту.',
			subtitleVerificationCodeScreen:
				'Код підтвердження надіслано на {{emailAddress}}. Введіть його для продовження.',
			title: 'Підтвердити домен',
		},
	},
	organizationSwitcher: {
		action__createOrganization: 'Створити організацію',
		action__invitationAccept: 'Join',
		action__manageOrganization: 'Управління організацією',
		action__suggestionsAccept: 'Request to join',
		notSelected: 'Організація не обрана',
		personalWorkspace: 'Особистий робочий простір',
		suggestionsAcceptedLabel: 'Pending approval',
	},
	paginationButton__next: 'Вперед',
	paginationButton__previous: 'Назад',
	paginationRowText__displaying: 'Відображення',
	paginationRowText__of: 'з',
	reverification: {
		alternativeMethods: {
			actionLink: 'Отримати допомогу',
			actionText: 'Немає жодного з цих методів?',
			blockButton__backupCode: 'Використати резервний код',
			blockButton__emailCode: 'Надіслати код на {{identifier}}',
			blockButton__password: 'Увійти з паролем',
			blockButton__phoneCode: 'Надіслати SMS-код на {{identifier}}',
			blockButton__totp: 'Використати додаток аутентифікації',
			getHelp: {
				blockButton__emailSupport: 'Звʼязатися з підтримкою',
				content:
					'Якщо виникли проблеми з підтвердженням, напишіть нам, і ми допоможемо відновити доступ.',
				title: 'Допомога',
			},
			subtitle: 'Виникли проблеми? Використайте інший метод для підтвердження.',
			title: 'Використати інший метод',
		},
		backupCodeMfa: {
			subtitle:
				'Щоб продовжити, введіть резервний код, який ви отримали під час налаштування двофакторної аутентифікації.',
			title: 'Введіть резервний код',
		},
		emailCode: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Введіть код, надісланий на вашу електронну адресу, щоб продовжити.',
			title: 'Перевірте свою електронну пошту',
		},
		noAvailableMethods: {
			message:
				'Неможливо продовжити підтвердження. Немає доступних методів аутентифікації.',
			subtitle: 'Виникла помилка',
			title: 'Неможливо підтвердити ваш акаунт',
		},
		password: {
			actionLink: 'Використати інший метод',
			subtitle: 'Введіть пароль, щоб продовжити.',
			title: 'Підтвердження пароля',
		},
		phoneCode: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Введіть код, надісланий на ваш номер телефону, щоб продовжити.',
			title: 'Перевірте свій телефон',
		},
		phoneCodeMfa: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Введіть код, надісланий на ваш номер телефону, щоб продовжити.',
			title: 'Перевірте свій телефон',
		},
		totpMfa: {
			formTitle: 'Код підтвердження',
			subtitle:
				'Введіть код, згенерований вашим додатком аутентифікації, щоб продовжити.',
			title: 'Двофакторна аутентифікація',
		},
	},
	signIn: {
		accountSwitcher: {
			action__addAccount: 'Додати акаунт',
			action__signOutAll: 'Вийти з усіх акаунтів',
			subtitle: 'Оберіть акаунт, з яким хочете продовжити.',
			title: 'Оберіть акаунт',
		},
		alternativeMethods: {
			actionLink: 'Отримати допомогу',
			actionText: 'Немає жодного з цих методів?',
			blockButton__backupCode: 'Використати резервний код',
			blockButton__emailCode: 'Надіслати код на {{identifier}}',
			blockButton__emailLink: 'Надіслати посилання на {{identifier}}',
			blockButton__passkey: 'Увійти за допомогою паскі',
			blockButton__password: 'Увійти з паролем',
			blockButton__phoneCode: 'Надіслати SMS-код на {{identifier}}',
			blockButton__totp: 'Використати додаток аутентифікації',
			getHelp: {
				blockButton__emailSupport: 'Звʼязатися з підтримкою',
				content:
					'Якщо виникли проблеми з входом, напишіть нам, і ми допоможемо відновити доступ.',
				title: 'Допомога',
			},
			subtitle: 'Виникли проблеми? Використайте інший метод для входу.',
			title: 'Використати інший метод',
		},
		backupCodeMfa: {
			subtitle:
				'Щоб продовжити, введіть резервний код, який ви отримали під час налаштування двофакторної аутентифікації.',
			title: 'Введіть резервний код',
		},
		emailCode: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Щоб продовжити до {{applicationName}}, введіть код, надісланий на вашу електронну пошту.',
			title: 'Перевірте свою електронну пошту',
		},
		emailLink: {
			clientMismatch: {
				subtitle:
					'Щоб продовжити, відкрийте посилання для підтвердження на пристрої та в браузері, з якого ви ініціювали вхід.',
				title: 'Посилання для підтвердження недійсне для цього пристрою',
			},
			expired: {
				subtitle: 'Поверніться на початкову вкладку, щоб продовжити.',
				title: 'Термін дії посилання для підтвердження закінчився',
			},
			failed: {
				subtitle: 'Поверніться на початкову вкладку, щоб продовжити.',
				title: 'Посилання для підтвердження недійсне',
			},
			formSubtitle:
				'Використайте посилання для підтвердження, надіслане на вашу електронну пошту.',
			formTitle: 'Посилання для підтвердження',
			loading: {
				subtitle: 'Ви будете перенаправлені найближчим часом.',
				title: 'Виконується вхід...',
			},
			resendButton: 'Не отримали посилання? Надіслати знову',
			subtitle:
				'Щоб продовжити до {{applicationName}}, використайте посилання, надіслане на вашу електронну пошту.',
			title: 'Перевірте свою електронну пошту',
			unusedTab: {
				title: 'Ви можете закрити цю вкладку',
			},
			verified: {
				subtitle: 'Ви будете перенаправлені найближчим часом.',
				title: 'Успішний вхід',
			},
			verifiedSwitchTab: {
				subtitle: 'Поверніться на початкову вкладку, щоб продовжити.',
				subtitleNewTab:
					'Поверніться до щойно відкритої вкладки, щоб продовжити.',
				titleNewTab: 'Ви увійшли на іншій вкладці',
			},
		},
		forgotPassword: {
			formTitle: 'Код відновлення пароля',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Щоб відновити пароль, введіть код, надісланий на вашу електронну пошту.',
			subtitle_email:
				'Спочатку введіть код, надісланий на вашу електронну пошту.',
			subtitle_phone: 'Спочатку введіть код, надісланий на ваш телефон.',
			title: 'Відновити пароль',
		},
		forgotPasswordAlternativeMethods: {
			blockButton__resetPassword: 'Відновити пароль',
			label__alternativeMethods: 'Або увійдіть іншим способом',
			title: 'Забули пароль?',
		},
		noAvailableMethods: {
			message:
				'Неможливо продовжити вхід. Немає доступних методів аутентифікації.',
			subtitle: 'Виникла помилка',
			title: 'Неможливо увійти',
		},
		passkey: {
			subtitle:
				'Використання паскі підтверджує, що це ви. Ваш пристрій може запросити відбиток пальця, обличчя або екранний замок.',
			title: 'Використати паску',
		},
		password: {
			actionLink: 'Використати інший метод',
			subtitle: 'Введіть пароль, повʼязаний з вашим акаунтом.',
			title: 'Введіть пароль',
		},
		passwordPwned: {
			title: 'Пароль скомпрометовано',
		},
		phoneCode: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Щоб продовжити до {{applicationName}}, введіть код, надісланий на ваш телефон.',
			title: 'Перевірте свій телефон',
		},
		phoneCodeMfa: {
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle: 'Щоб продовжити, введіть код, надісланий на ваш телефон.',
			title: 'Перевірте свій телефон',
		},
		resetPassword: {
			formButtonPrimary: 'Відновити пароль',
			requiredMessage: 'З міркувань безпеки необхідно відновити пароль.',
			successMessage:
				'Ваш пароль успішно змінено. Виконується вхід, зачекайте.',
			title: 'Встановити новий пароль',
		},
		resetPasswordMfa: {
			detailsLabel:
				'Нам потрібно підтвердити вашу особу перед відновленням пароля.',
		},
		start: {
			actionLink: 'Зареєструватися',
			actionLink__join_waitlist: 'Приєднатися до списку очікування',
			actionLink__use_email: 'Використати електронну пошту',
			actionLink__use_email_username:
				"Використати електронну пошту або ім'я користувача",
			actionLink__use_passkey: 'Використати паску',
			actionLink__use_phone: 'Використати номер телефону',
			actionLink__use_username: "Використати ім'я користувача",
			actionText: 'Немає акаунта?',
			actionText__join_waitlist: 'Хочете отримати ранній доступ?',
			subtitle: 'Ласкаво просимо! Будь ласка, увійдіть, щоб продовжити.',
			subtitleCombined:
				'Ласкаво просимо! Будь ласка, увійдіть, щоб продовжити.',
			title: 'Увійти до {{applicationName}}',
			titleCombined: 'Продовжити до {{applicationName}}',
		},
		totpMfa: {
			formTitle: 'Код підтвердження',
			subtitle:
				'Щоб продовжити, введіть код, згенерований вашим додатком аутентифікації.',
			title: 'Двофакторна аутентифікація',
		},
	},
	signInEnterPasswordTitle: 'Введіть ваш пароль',
	signUp: {
		continue: {
			actionLink: 'Увійти',
			actionText: 'Вже маєте акаунт?',
			subtitle: 'Будь ласка, заповніть решту деталей, щоб продовжити.',
			title: 'Заповніть відсутні поля',
		},
		emailCode: {
			formSubtitle:
				'Введіть код підтвердження, надісланий на вашу електронну адресу.',
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle:
				'Введіть код підтвердження, надісланий на вашу електронну пошту.',
			title: 'Підтвердьте свою електронну пошту',
		},
		emailLink: {
			clientMismatch: {
				subtitle:
					'Щоб продовжити, відкрийте посилання для підтвердження на пристрої та в браузері, з якого ви ініціювали реєстрацію.',
				title: 'Посилання для підтвердження недійсне для цього пристрою',
			},
			formSubtitle:
				'Використайте посилання для підтвердження, надіслане на вашу електронну адресу.',
			formTitle: 'Посилання для підтвердження',
			loading: {
				title: 'Реєстрація...',
			},
			resendButton: 'Не отримали посилання? Надіслати знову',
			subtitle:
				'Щоб продовжити до {{applicationName}}, використайте посилання, надіслане на вашу електронну пошту.',
			title: 'Підтвердьте свою електронну пошту',
			verified: {
				title: 'Успішно зареєстровано',
			},
			verifiedSwitchTab: {
				subtitle: 'Поверніться до щойно відкритої вкладки, щоб продовжити.',
				subtitleNewTab: 'Поверніться до попередньої вкладки, щоб продовжити.',
				title: 'Електронну пошту підтверджено',
			},
		},
		legalConsent: {
			checkbox: {
				label__onlyPrivacyPolicy:
					'Я погоджуюсь з {{ privacyPolicyLink || link("Політикою конфіденційності") }}',
				label__onlyTermsOfService:
					'Я погоджуюсь з {{ termsOfServiceLink || link("Умовами обслуговування") }}',
				label__termsOfServiceAndPrivacyPolicy:
					'Я погоджуюсь з {{ termsOfServiceLink || link("Умовами обслуговування") }} та {{ privacyPolicyLink || link("Політикою конфіденційності") }}',
			},
			continue: {
				subtitle: 'Будь ласка, прочитайте та прийміть умови, щоб продовжити.',
				title: 'Юридична згода',
			},
		},
		phoneCode: {
			formSubtitle:
				'Введіть код підтвердження, надісланий на ваш номер телефону.',
			formTitle: 'Код підтвердження',
			resendButton: 'Не отримали код? Надіслати знову',
			subtitle: 'Введіть код підтвердження, надісланий на ваш телефон.',
			title: 'Підтвердьте свій телефон',
		},
		restrictedAccess: {
			actionLink: 'Увійти',
			actionText: 'Вже маєте акаунт?',
			blockButton__emailSupport: 'Звʼязатися з підтримкою',
			blockButton__joinWaitlist: 'Приєднатися до списку очікування',
			subtitle:
				'Реєстрація зараз обмежена. Якщо ви вважаєте, що маєте доступ, звʼяжіться з підтримкою.',
			subtitleWaitlist:
				'Реєстрація зараз обмежена. Щоб дізнатися першими про запуск, приєднайтеся до списку очікування.',
			title: 'Доступ обмежений',
		},
		start: {
			actionLink: 'Увійти',
			actionLink__use_email: 'Використати електронну пошту',
			actionLink__use_phone: 'Використати номер телефону',
			actionText: 'Вже маєте акаунт?',
			subtitle: 'Ласкаво просимо! Будь ласка, заповніть деталі, щоб почати.',
			subtitleCombined:
				'Ласкаво просимо! Будь ласка, заповніть деталі, щоб почати.',
			title: 'Створіть свій акаунт',
			titleCombined: 'Створіть свій акаунт',
		},
	},
	socialButtonsBlockButton: 'Продовжити за допомогою {{provider|titleize}}',
	socialButtonsBlockButtonManyInView: '{{provider|titleize}}',
	unstable__errors: {
		already_a_member_in_organization: '{{email}} вже є учасником організації.',
		captcha_invalid:
			'Реєстрація не вдалася через невдалі перевірки безпеки. Будь ласка, оновіть сторінку або зверніться до підтримки.',
		captcha_unavailable:
			'Реєстрація не вдалася через невдалу перевірку на бота. Будь ласка, оновіть сторінку або зверніться до підтримки.',
		form_code_incorrect: 'Невірний код.',
		form_identifier_exists__email_address:
			'Ця електронна адреса вже використовується. Спробуйте іншу.',
		form_identifier_exists__phone_number:
			'Цей номер телефону вже використовується. Спробуйте інший.',
		form_identifier_exists__username:
			"Це ім'я користувача вже використовується. Спробуйте інше.",
		form_identifier_not_found:
			'Акаунт з таким ідентифікатором не знайдено. Будь ласка, перевірте та спробуйте ще раз.',
		form_param_format_invalid:
			'Введене значення має невірний формат. Будь ласка, перевірте та виправте його.',
		form_param_format_invalid__email_address:
			'Електронна адреса має бути дійсною.',
		form_param_format_invalid__phone_number:
			'Номер телефону має бути у міжнародному форматі.',
		form_param_max_length_exceeded__first_name:
			"Ім'я не повинно перевищувати 256 символів.",
		form_param_max_length_exceeded__last_name:
			'Прізвище не повинно перевищувати 256 символів.',
		form_param_max_length_exceeded__name:
			'Назва не повинна перевищувати 256 символів.',
		form_param_nil: "Це поле є обов'язковим і не може бути порожнім.",
		form_param_value_invalid:
			'Введене значення є недійсним. Будь ласка, виправте його.',
		form_password_incorrect: 'Невірний пароль. Будь ласка, спробуйте ще раз.',
		form_password_length_too_short:
			'Ваш пароль занадто короткий. Він має містити щонайменше 8 символів.',
		form_password_not_strong_enough: 'Ваш пароль недостатньо надійний.',
		form_password_pwned:
			'Цей пароль було зламано, і його не можна використовувати. Спробуйте інший пароль.',
		form_password_pwned__sign_in:
			'Цей пароль було зламано. Будь ласка, скиньте пароль.',
		form_password_size_in_bytes_exceeded:
			'Ваш пароль перевищує максимальну кількість байтів. Скоротіть його або видаліть спеціальні символи.',
		form_password_validation_failed: 'Невірний пароль',
		form_username_invalid_character:
			"Ваше ім'я користувача містить недійсні символи. Використовуйте лише літери, цифри та підкреслення.",
		form_username_invalid_length:
			"Ваше ім'я користувача має бути від {{min_length}} до {{max_length}} символів.",
		identification_deletion_failed:
			'Ви не можете видалити останній ідентифікатор.',
		not_allowed_access:
			'У вас немає дозволу на доступ до цієї сторінки. Якщо ви вважаєте, що це помилка, зверніться до підтримки.',
		organization_domain_blocked:
			'Цей домен електронної пошти заблокований. Будь ласка, використовуйте інший.',
		organization_domain_common:
			'Це загальний домен електронної пошти. Будь ласка, використовуйте інший.',
		organization_domain_exists_for_enterprise_connection:
			'Цей домен вже використовується для SSO вашої організації.',
		organization_membership_quota_exceeded:
			'Ви досягли ліміту членів організації, включаючи запрошення.',
		organization_minimum_permissions_needed:
			'Має бути щонайменше один член організації з мінімальними необхідними дозволами.',
		passkey_already_exists: 'Паска вже зареєстрована на цьому пристрої.',
		passkey_not_supported: 'Паски не підтримуються на цьому пристрої.',
		passkey_pa_not_supported:
			'Реєстрація вимагає платформного аутентифікатора, але пристрій не підтримує його.',
		passkey_registration_cancelled:
			'Реєстрація паски скасована або закінчилася через час.',
		passkey_retrieval_cancelled:
			'Перевірка паски скасована або закінчилася через час.',
		passwordComplexity: {
			maximumLength: 'менше {{length}} символів',
			minimumLength: '{{length}} або більше символів',
			requireLowercase: 'маленьку літеру',
			requireNumbers: 'цифру',
			requireSpecialCharacter: 'спеціальний символ',
			requireUppercase: 'велику літеру',
			sentencePrefix: 'Ваш пароль повинен містити',
		},
		phone_number_exists:
			'Цей номер телефону вже використовується. Спробуйте інший.',
		web3_missing_identifier:
			'Розширення Web3 Wallet не знайдено. Будь ласка, встановіть його, щоб продовжити.',
		zxcvbn: {
			couldBeStronger:
				'Ваш пароль підходить, але міг би бути надійнішим. Спробуйте додати більше символів.',
			goodPassword: 'Ваш пароль відповідає всім необхідним вимогам.',
			notEnough: 'Ваш пароль недостатньо надійний.',
			suggestions: {
				allUppercase: 'Робіть великими деякі, але не всі літери.',
				anotherWord: 'Додайте більше слів, які менш поширені.',
				associatedYears: "Уникайте років, які пов'язані з вами.",
				capitalization: 'Робіть великими не тільки першу літеру.',
				dates: "Уникайте дат і років, які пов'язані з вами.",
				l33t: 'Уникайте передбачуваних замін літер, таких як "@" замість "a".',
				longerKeyboardPattern:
					'Використовуйте довші комбінації клавіш і змінюйте напрямок введення.',
				noNeed:
					'Ви можете створювати надійні паролі без використання символів, цифр або великих літер.',
				pwned:
					'Якщо ви використовуєте цей пароль в іншому місці, вам слід змінити його.',
				recentYears: 'Уникайте останніх років.',
				repeated: 'Уникайте повторюваних слів і символів.',
				reverseWords:
					'Уникайте зворотного написання часто використовуваних слів.',
				sequences: 'Уникайте поширених послідовностей символів.',
				useWords: 'Використовуйте кілька слів, але уникайте поширених фраз.',
			},
			warnings: {
				common: 'Це поширений пароль.',
				commonNames: 'Поширені імена та прізвища легко вгадати.',
				dates: 'Дати легко вгадати.',
				extendedRepeat:
					'Повторювані шаблони символів, такі як "abcabcabc", легко вгадати.',
				keyPattern: 'Короткі комбінації клавіш легко вгадати.',
				namesByThemselves: 'Одні імена або прізвища легко вгадати.',
				pwned: 'Ваш пароль було розкрито через витік даних в Інтернеті.',
				recentYears: 'Останні роки легко вгадати.',
				sequences:
					'Поширені послідовності символів, такі як "abc", легко вгадати.',
				similarToCommon: 'Цей пароль схожий на часто використовуваний пароль.',
				simpleRepeat: 'Повторювані символи, такі як "aaa", легко вгадати.',
				straightRow: 'Прямі ряди клавіш на клавіатурі легко вгадати.',
				topHundred: 'Це часто використовуваний пароль.',
				topTen: 'Це дуже часто використовуваний пароль.',
				userInputs:
					"Не повинно бути ніяких особистих даних або даних, пов'язаних зі сторінкою.",
				wordByItself: 'Окремі слова легко вгадати.',
			},
		},
	},
	userButton: {
		action__addAccount: 'Додати акаунт',
		action__manageAccount: 'Керування акаунтом',
		action__signOut: 'Вийти',
		action__signOutAll: 'Вийти з усіх акаунтів',
	},
	userProfile: {
		backupCodePage: {
			actionLabel__copied: 'Скопійовано!',
			actionLabel__copy: 'Копіювати все',
			actionLabel__download: 'Завантажити .txt',
			actionLabel__print: 'Друк',
			infoText1: 'Резервні коди будуть увімкнені для цього акаунта.',
			infoText2:
				'Зберігайте резервні коди в таємниці та зберігайте їх у безпеці. Ви можете створити нові резервні коди, якщо підозрюєте, що вони були скомпрометовані.',
			subtitle__codelist: 'Зберігайте їх у безпеці та не повідомляйте нікому.',
			successMessage:
				'Резервні коди увімкнено. Ви можете використовувати один із цих кодів для входу, якщо ви втратите доступ до свого аутентифікаційного пристрою. Кожен код можна використовувати лише один раз.',
			successSubtitle:
				'Ви можете використовувати один із цих кодів для входу, якщо ви втратите доступ до свого аутентифікаційного пристрою.',
			title: 'Додати резервні коди',
			title__codelist: 'Резервні коди',
		},
		connectedAccountPage: {
			formHint: 'Виберіть провайдера для підключення вашого акаунта.',
			formHint__noAccounts: 'Немає доступних зовнішніх провайдерів акаунтів.',
			removeResource: {
				messageLine1: '{{identifier}} буде видалено з вашого акаунта.',
				messageLine2:
					'Ви більше не зможете використовувати цей підключений акаунт, і будь-які залежні функції більше не працюватимуть.',
				successMessage: '{{connectedAccount}} було видалено з вашого акаунта.',
				title: 'Видалити підключений акаунт',
			},
			socialButtonsBlockButton: 'Підключити акаунт {{provider|titleize}}',
			successMessage: 'Провайдера було додано до вашого акаунта',
			title: 'Додати підключений акаунт',
		},
		deletePage: {
			actionDescription: 'Введіть "Видалити акаунт" нижче, щоб продовжити.',
			confirm: 'Видалити акаунт',
			messageLine1: 'Ви впевнені, що хочете видалити свій акаунт?',
			messageLine2: 'Ця дія є остаточною та незворотною.',
			title: 'Видалити акаунт',
		},
		emailAddressPage: {
			emailCode: {
				formHint:
					'На цю електронну адресу буде надіслано лист із кодом підтвердження.',
				formSubtitle:
					'Введіть код підтвердження, надісланий на {{identifier}}.',
				formTitle: 'Код підтвердження',
				resendButton: 'Не отримали код? Надіслати знову',
				successMessage:
					'Електронну адресу {{identifier}} було додано до вашого акаунта.',
			},
			emailLink: {
				formHint:
					'На цю електронну адресу буде надіслано лист із посиланням для підтвердження.',
				formSubtitle:
					'Натисніть на посилання для підтвердження в листі, надісланому на {{identifier}}.',
				formTitle: 'Посилання для підтвердження',
				resendButton: 'Не отримали посилання? Надіслати знову',
				successMessage:
					'Електронну адресу {{identifier}} було додано до вашого акаунта.',
			},
			enterpriseSSOLink: {
				formButton: 'Натисніть для входу',
				formSubtitle: 'Завершіть вхід за допомогою {{identifier}}.',
			},
			formHint:
				'Вам потрібно підтвердити цю електронну адресу перед додаванням до акаунта.',
			removeResource: {
				messageLine1: '{{identifier}} буде видалено з вашого акаунта.',
				messageLine2:
					'Ви більше не зможете увійти за допомогою цієї електронної адреси.',
				successMessage: '{{emailAddress}} було видалено з вашого акаунта.',
				title: 'Видалити електронну адресу',
			},
			title: 'Додати електронну адресу',
			verifyTitle: 'Підтвердити електронну адресу',
		},
		formButtonPrimary__add: 'Додати',
		formButtonPrimary__continue: 'Продовжити',
		formButtonPrimary__finish: 'Завершити',
		formButtonPrimary__remove: 'Видалити',
		formButtonPrimary__save: 'Зберегти',
		formButtonReset: 'Скасувати',
		mfaPage: {
			formHint: 'Виберіть метод для додавання.',
			title: 'Додати двофакторну аутентифікацію',
		},
		mfaPhoneCodePage: {
			backButton: 'Використати існуючий номер',
			primaryButton__addPhoneNumber: 'Додати номер телефону',
			removeResource: {
				messageLine1:
					'{{identifier}} більше не буде отримувати коди підтвердження при вході.',
				messageLine2:
					'Ваш акаунт буде менш захищеним. Ви впевнені, що хочете продовжити?',
				successMessage:
					'Двофакторна аутентифікація з SMS-кодом була видалена для {{mfaPhoneCode}}.',
				title: 'Видалити двофакторну аутентифікацію',
			},
			subtitle__availablePhoneNumbers:
				'Виберіть існуючий номер телефону для реєстрації в двофакторній аутентифікації з SMS-кодом або додайте новий.',
			subtitle__unavailablePhoneNumbers:
				'Немає доступних номерів телефону для реєстрації в двофакторній аутентифікації з SMS-кодом. Будь ласка, додайте новий номер.',
			successMessage1:
				'Під час входу вам потрібно буде ввести код підтвердження, надісланий на цей номер телефону.',
			successMessage2:
				'Збережіть ці резервні коди в безпеці. Якщо ви втратите доступ до аутентифікаційного пристрою, ви зможете використовувати резервні коди для входу.',
			successTitle: 'SMS-код підтвердження увімкнено',
			title: 'Додати SMS-код підтвердження',
		},
		mfaTOTPPage: {
			authenticatorApp: {
				buttonAbleToScan__nonPrimary: 'Замість цього відскануйте QR-код',
				buttonUnableToScan__nonPrimary: 'Не вдається відсканувати QR-код?',
				infoText__ableToScan:
					"Налаштуйте новий метод входу у вашому застосунку аутентифікації та відскануйте наступний QR-код, щоб пов'язати його з вашим обліковим записом.",
				infoText__unableToScan:
					'Налаштуйте новий метод входу у вашому застосунку автентифікації та введіть нижче наданий ключ.',
				inputLabel__unableToScan1:
					"Переконайтеся, що ввімкнено одноразові паролі на основі часу, потім завершіть зв'язування свого облікового запису.",
				inputLabel__unableToScan2:
					'Крім того, якщо ваш додаток аутентифікації підтримує URI TOTP, ви також можете скопіювати повний URI.',
			},
			removeResource: {
				messageLine1:
					'Верифікаційний код із цього додатка автентифікації більше не буде потрібен під час входу в систему.',
				messageLine2:
					'Ваш акаунт буде менш захищеним. Ви впевнені, що хочете продовжити?',
				successMessage:
					'Двоетапну автентифікацію через застосунок автентифікації було видалено.',
				title: 'Видалення двоетапної аутентифікації',
			},
			successMessage:
				'Двоетапна перевірка ввімкнена. Під час входу в систему вам потрібно буде ввести верифікаційний код із цього додатка як додатковий крок.',
			title: 'Додати додаток аутентифікації',
			verifySubtitle:
				'Введіть верифікаційний код, створений вашим додатком аутентифікації',
			verifyTitle: 'Верифікаційний код',
		},
		mobileButton__menu: 'Меню',
		navbar: {
			account: 'Профіль',
			description: 'Керування інформацією про ваш акаунт.',
			security: 'Безпека',
			title: 'Акаунт',
		},
		passkeyScreen: {
			removeResource: {
				messageLine1: '{{name}} буде видалено з вашого акаунта.',
				title: 'Видалити ключ',
			},
			subtitle__rename:
				'Ви можете змінити назву ключа, щоб його було легше знайти.',
			title__rename: 'Перейменувати ключ',
		},
		passwordPage: {
			checkboxInfoText__signOutOfOtherSessions:
				'Рекомендується вийти з усіх інших пристроїв, які могли використовувати ваш старий пароль.',
			readonly:
				'Ваш пароль зараз не можна змінити, оскільки ви можете увійти лише через корпоративне підключення.',
			successMessage__set: 'Ваш пароль успішно встановлено.',
			successMessage__signOutOfOtherSessions:
				'Усі інші пристрої були виведені з системи.',
			successMessage__update: 'Ваш пароль успішно оновлено.',
			title__set: 'Встановити пароль',
			title__update: 'Оновити пароль',
		},
		phoneNumberPage: {
			infoText:
				'На цей номер телефону буде надіслано текстове повідомлення з верифікаційним посиланням.',
			removeResource: {
				messageLine1: '{{identifier}} буде видалено з цього облікового запису.',
				messageLine2:
					'Ви більше не зможете увійти, використовуючи цей номер телефону.',
				successMessage:
					'{{phoneNumber}} було видалено з вашого облікового запису.',
				title: 'Видалити номер телефону',
			},
			successMessage: '{{identifier}} було додано до вашого облікового запису.',
			title: 'Додати номер телефону',
			verifySubtitle: 'Введіть код підтвердження, надісланий на {{identifier}}',
			verifyTitle: 'Verify phone number',
		},
		profilePage: {
			fileDropAreaHint:
				'Завантажте зображення у форматах JPG, PNG, GIF або WEBP розміром менше 10 МБ',
			imageFormDestructiveActionSubtitle: 'Видалити зображення',
			imageFormSubtitle: 'Завантажити зображення',
			imageFormTitle: 'Зображення профілю',
			readonly:
				'Інформація про ваш профіль надається через корпоративне підключення і не може бути змінена.',
			successMessage: 'Ваш профіль було оновлено.',
			title: 'Оновити профіль',
		},
		start: {
			activeDevicesSection: {
				destructiveAction: 'Вийти з пристрою',
				title: 'Активні пристрої',
			},
			connectedAccountsSection: {
				actionLabel__connectionFailed: 'Спробувати знову',
				actionLabel__reauthorize: 'Авторизувати зараз',
				destructiveActionTitle: 'Видалити',
				primaryButton: 'Підключити акаунт',
				subtitle__disconnected: 'Цей акаунт було відключено.',
				subtitle__reauthorize:
					'Необхідні дозволи були оновлені, і ви можете мати обмежену функціональність. Будь ласка, повторно авторизуйте цей додаток, щоб уникнути проблем.',
				title: 'Підключені акаунти',
			},
			dangerSection: {
				deleteAccountButton: 'Видалити акаунт',
				title: 'Небезпека',
			},
			emailAddressesSection: {
				destructiveAction: 'Видалити адресу електронної пошти',
				detailsAction__nonPrimary: 'Встановити як основну',
				detailsAction__primary: 'Завершити перевірку',
				detailsAction__unverified: 'Завершити перевірку',
				primaryButton: 'Додати адресу електронної пошти',
				title: 'Адреси електронної пошти',
			},
			enterpriseAccountsSection: {
				title: 'Корпоративні акаунти',
			},
			headerTitle__account: 'Обліковий запис',
			headerTitle__security: 'Безпека',
			mfaSection: {
				backupCodes: {
					actionLabel__regenerate: 'Згенерувати коди',
					headerTitle: 'Резервні коди',
					subtitle__regenerate:
						'Отримайте новий набір безпечних резервних кодів. Попередні резервні коди будуть видалені і не можуть бути використані.',
					title__regenerate: 'Згенерувати нові резервні коди',
				},
				phoneCode: {
					actionLabel__setDefault: 'Встановити за замовчуванням',
					destructiveActionLabel: 'Видалити номер телефону',
				},
				primaryButton: 'Додати двофакторну аутентифікацію',
				title: 'Двофакторна аутентифікація',
				totp: {
					destructiveActionTitle: 'Видалити',
					headerTitle: 'Додаток аутентифікації',
				},
			},
			passkeysSection: {
				menuAction__destructive: 'Видалити',
				menuAction__rename: 'Перейменувати',
				primaryButton: 'Додати ключ',
				title: 'Ключі',
			},
			passwordSection: {
				primaryButton__setPassword: 'Встановити пароль',
				primaryButton__updatePassword: 'Змінити пароль',
				title: 'Пароль',
			},
			phoneNumbersSection: {
				destructiveAction: 'Видалити номер телефону',
				detailsAction__nonPrimary: 'Встановити як основний',
				detailsAction__primary: 'Завершити верифікацію',
				detailsAction__unverified: 'Завершити верифікацію',
				primaryButton: 'Додати номер телефону',
				title: 'Номери телефонів',
			},
			profileSection: {
				primaryButton: 'Оновити профіль',
				title: 'Профіль',
			},
			usernameSection: {
				primaryButton__setUsername: "Встановити ім'я користувача",
				primaryButton__updateUsername: "Змінити ім'я користувача",
				title: "Ім'я користувача",
			},
			web3WalletsSection: {
				destructiveAction: 'Видалити гаманець',
				primaryButton: 'Web3 гаманці',
				title: 'Web3 гаманці',
			},
		},
		usernamePage: {
			successMessage: "Ім'я користувача було оновлено.",
			title__set: "Оновити ім'я користувача",
			title__update: "Оновити ім'я користувача",
		},
		web3WalletPage: {
			removeResource: {
				messageLine1: '{{identifier}} буде видалено з цього облікового запису.',
				messageLine2:
					'Ви більше не зможете Увійти з використанням цього web3 гаманця.',
				successMessage:
					'{{web3Wallet}} було видалено з вашого облікового запису.',
				title: 'Видалити web3 гаманець',
			},
			subtitle__availableWallets:
				'Виберіть web3 гаманець для підключення до вашого облікового запису.',
			subtitle__unavailableWallets: 'Немає доступних web3 гаманців.',
			successMessage: 'Гаманець було додано до вашого облікового запису.',
			title: 'Додати web3 гаманець',
			web3WalletButtonsBlockButton: '{{provider|titleize}}',
		},
	},
	waitlist: {
		start: {
			actionLink: 'Увійти',
			actionText: 'Вже маєте доступ?',
			formButton: 'Приєднатися до списку очікування',
			subtitle:
				'Введіть свою електронну адресу, і ми повідомимо вас, коли ваше місце буде готове.',
			title: 'Приєднатися до списку очікування',
		},
		success: {
			message: 'Ви будете перенаправлені найближчим часом...',
			subtitle: 'Ми повідомимо вас, коли ваше місце буде готове.',
			title: 'Дякуємо за приєднання до списку очікування!',
		},
	},
} as const;
