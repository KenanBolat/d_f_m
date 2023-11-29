"""
Django admin customazation
"""
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from . import models
admin.site.site_header = 'Data Conversion Admin'
admin.site.site_title = 'Data Conversion Admin'
admin.site.index_title = 'Data Conversion Management'

class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users."""
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password',)}
         ),
        (
            _('Permissions'), {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important Dates'), {'fields': ('last_login',)})
    )
    readonly_fields = ['last_login']

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'name',
                'is_active',
                'is_staff',
                'is_superuser',
            )

        }),
    )


admin.site.register(models.User, UserAdmin)
# for the customization UserAdmin must be included
admin.site.register(models.Data)
admin.site.register(models.Mission)
admin.site.register(models.Configuration)
admin.site.register(models.Event)
admin.site.register(models.Consumed)
